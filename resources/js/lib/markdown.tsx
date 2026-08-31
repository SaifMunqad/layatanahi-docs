import { useMemo, useState, type ElementType, type ReactNode } from 'react';
import { Check, Clipboard } from 'lucide-react';

export type Heading = {
    id: string;
    label: string;
    depth: number;
};

export type ParsedMarkdown = {
    headings: Heading[];
    content: ReactNode;
};

/** Removes a leading YAML front-matter block (`--- ... ---`). */
export function stripFrontMatter(source: string): string {
    return source.replace(/^---[\s\S]*?---\s*/, '');
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/** Generates a stable, unique slug for a heading. */
function uniqueSlug(text: string, used: Set<string>): string {
    const base = slugify(text) || 'section';
    let slug = base;
    let counter = 1;
    while (used.has(slug)) {
        slug = `${base}-${counter++}`;
    }
    used.add(slug);
    return slug;
}

const INLINE_PATTERN =
    /(!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*]+\*|_[^_]+_)/g;

/** Renders inline Markdown (links, images, code, bold, italic, strike-through). */
function renderInline(value: string): ReactNode[] {
    return value
        .split(INLINE_PATTERN)
        .filter(Boolean)
        .map((part, index) => {
            const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (image) {
                return (
                    <img
                        key={index}
                        src={image[2]}
                        alt={image[1]}
                        className="my-4 max-w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                    />
                );
            }

            const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (link) {
                const external = /^https?:\/\//.test(link[2]);
                return (
                    <a
                        key={index}
                        href={link[2]}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 transition-colors hover:text-red-500 dark:text-red-400 dark:decoration-red-500/50"
                    >
                        {renderInline(link[1])}
                    </a>
                );
            }

            if (part.startsWith('`')) {
                return (
                    <code
                        key={index}
                        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-red-700 dark:bg-zinc-800 dark:text-red-300"
                    >
                        {part.slice(1, -1)}
                    </code>
                );
            }

            if (part.startsWith('**') || part.startsWith('__')) {
                return (
                    <strong key={index} className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {renderInline(part.slice(2, -2))}
                    </strong>
                );
            }

            if (part.startsWith('~~')) {
                return <del key={index}>{renderInline(part.slice(2, -2))}</del>;
            }

            if (part.startsWith('*') || part.startsWith('_')) {
                return <em key={index}>{renderInline(part.slice(1, -1))}</em>;
            }

            return <span key={index}>{part}</span>;
        });
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        if (!navigator.clipboard) return;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-400">
                <span className="uppercase tracking-wide">{language || 'code'}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="flex items-center gap-1.5 rounded px-1.5 py-0.5 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-6">
                <code className="font-mono">{code}</code>
            </pre>
        </div>
    );
}

const HEADING_CLASSES: Record<number, string> = {
    1: 'mt-0 mb-6 text-4xl font-bold tracking-tight',
    2: 'mt-12 mb-4 border-t border-zinc-100 pt-8 text-2xl font-semibold tracking-tight dark:border-zinc-800',
    3: 'mt-8 mb-3 text-xl font-semibold tracking-tight',
    4: 'mt-6 mb-2 text-lg font-semibold',
    5: 'mt-6 mb-2 text-base font-semibold',
    6: 'mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500',
};

function HeadingBlock({ depth, id, children }: { depth: number; id: string; children: ReactNode }) {
    const Tag = `h${depth}` as ElementType;
    return (
        <Tag id={id} className={`group scroll-mt-24 text-zinc-900 dark:text-zinc-100 ${HEADING_CLASSES[depth]}`}>
            <a href={`#${id}`} className="no-underline">
                {children}
                <span className="ml-2 text-red-500 opacity-0 transition-opacity group-hover:opacity-100">#</span>
            </a>
        </Tag>
    );
}

const isTableSeparator = (line?: string) =>
    !!line && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);

const BLOCK_BOUNDARY = /^(#{1,6})\s|^```|^\s*([-+*]|\d+\.)\s+|^>\s?|^([-*_])(?:\s*\3){2,}\s*$/;

/**
 * Parses a Markdown string into rendered React content and a flat list of
 * headings (with unique ids) suitable for building a table of contents.
 */
export function parseMarkdown(rawSource: string): ParsedMarkdown {
    const source = stripFrontMatter(rawSource);
    const lines = source.split('\n');
    const blocks: ReactNode[] = [];
    const headings: Heading[] = [];
    const usedSlugs = new Set<string>();
    let key = 0;
    let i = 0;

    const splitCells = (line: string) =>
        line
            .trim()
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((cell) => cell.trim());

    while (i < lines.length) {
        const line = lines[i];

        if (!line.trim()) {
            i++;
            continue;
        }

        // Fenced code block.
        if (/^```/.test(line.trim())) {
            const language = line.trim().slice(3).trim();
            const start = ++i;
            while (i < lines.length && !/^```/.test(lines[i].trim())) i++;
            blocks.push(<CodeBlock key={key++} code={lines.slice(start, i).join('\n')} language={language} />);
            i++;
            continue;
        }

        // Heading.
        const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
        if (heading) {
            const depth = heading[1].length;
            const text = heading[2].trim();
            const id = uniqueSlug(text, usedSlugs);
            headings.push({ id, label: text, depth });
            blocks.push(
                <HeadingBlock key={key++} depth={depth} id={id}>
                    {renderInline(text)}
                </HeadingBlock>,
            );
            i++;
            continue;
        }

        // Horizontal rule.
        if (/^([-*_])(?:\s*\1){2,}\s*$/.test(line.trim())) {
            blocks.push(<hr key={key++} className="my-8 border-zinc-200 dark:border-zinc-800" />);
            i++;
            continue;
        }

        // Lists (ordered / unordered).
        const listMatch = line.match(/^\s*([-+*]|\d+\.)\s+(.+)/);
        if (listMatch) {
            const ordered = /\d+\./.test(listMatch[1]);
            const items: ReactNode[] = [];
            while (i < lines.length) {
                const item = lines[i].match(/^\s*([-+*]|\d+\.)\s+(.+)/);
                if (!item || /\d+\./.test(item[1]) !== ordered) break;
                items.push(
                    <li key={items.length} className="leading-7">
                        {renderInline(item[2])}
                    </li>,
                );
                i++;
            }
            const Tag = ordered ? 'ol' : 'ul';
            blocks.push(
                <Tag
                    key={key++}
                    className={`my-5 space-y-2 pl-6 text-zinc-700 dark:text-zinc-300 ${
                        ordered ? 'list-decimal' : 'list-disc'
                    }`}
                >
                    {items}
                </Tag>,
            );
            continue;
        }

        // Tables.
        if (isTableSeparator(lines[i + 1])) {
            const rows: string[][] = [splitCells(line)];
            i += 2;
            while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
                rows.push(splitCells(lines[i]));
                i++;
            }
            blocks.push(
                <div key={key++} className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-900">
                            <tr>
                                {rows[0].map((cell, index) => (
                                    <th key={index} className="px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100">
                                        {renderInline(cell)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-t border-zinc-200 dark:border-zinc-800">
                                    {row.map((cell, index) => (
                                        <td key={index} className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                                            {renderInline(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>,
            );
            continue;
        }

        // Blockquote.
        if (/^>\s?/.test(line)) {
            const quote: string[] = [];
            while (i < lines.length && /^>/.test(lines[i])) {
                quote.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            blocks.push(
                <blockquote
                    key={key++}
                    className="my-6 border-l-4 border-red-400 bg-red-50/50 px-4 py-2 italic text-zinc-700 dark:border-red-500/60 dark:bg-red-950/20 dark:text-zinc-300"
                >
                    {renderInline(quote.join(' '))}
                </blockquote>,
            );
            continue;
        }

        // Paragraph.
        const paragraph: string[] = [];
        while (i < lines.length && lines[i].trim() && !BLOCK_BOUNDARY.test(lines[i])) {
            paragraph.push(lines[i]);
            i++;
        }
        blocks.push(
            <p key={key++} className="my-4 leading-7 text-zinc-700 dark:text-zinc-300">
                {renderInline(paragraph.join(' '))}
            </p>,
        );
    }

    return { headings, content: blocks };
}

/** Convenience hook that memoizes parsing of a Markdown source string. */
export function useMarkdown(source: string): ParsedMarkdown {
    return useMemo(() => parseMarkdown(source), [source]);
}
