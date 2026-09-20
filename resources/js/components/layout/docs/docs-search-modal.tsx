import { Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { NAV_SECTIONS, resolveHref, type NavItem } from '@/components/layout/docs/docs-data';

type SearchModalProps = {
    open: boolean;
    onClose: () => void;
};

const markdownFiles = import.meta.glob('/resources/js/pages/docs/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const plainText = (value: string) =>
    value
        .replace(/<[^>]*>/g, ' ')
        .replace(/!?([[^]]*])\([^)]*\)/g, '$1')
        .replace(/[#*_`>-]/g, '')
        .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ({
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&nbsp;': ' ',
        })[entity] ?? entity)
        .replace(/\s+/g, ' ')
        .trim();

function HighlightedText({ text, query }: { text: string; query: string }) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return <>{text}</>;

    const parts = text.split(new RegExp(`(${trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === trimmedQuery.toLowerCase() ? (
                    <span key={index} className="text-cyan-600 dark:text-cyan-400">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
}

const contentForHref = (href: string) => {
    const routeName = normalize(href.split('/').filter(Boolean).pop() ?? '');
    const match = Object.entries(markdownFiles).find(([file]) => {
        const fileName = normalize(file.split('/').pop()?.replace(/\.md$/, '') ?? '');
        return fileName === routeName;
    });

    return match?.[1] ?? '';
};

const hrefWithSearch = (href: string, query: string) => {
    const url = new URL(href, window.location.origin);
    url.searchParams.set('search', query.trim());
    return `${url.pathname}${url.search}${url.hash}`;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const results = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const items: { item: NavItem; section: string; href: string; content: string; excerpt: string }[] = [];

        const collect = (item: NavItem, section: string) => {
            const href = resolveHref(item.path);
            items.push({ item, section, href, content: contentForHref(href), excerpt: '' });
            item.children?.forEach((child) => collect(child, `${section} / ${item.label}`));
        };

        NAV_SECTIONS.forEach((section) => section.items.forEach((item) => collect(item, section.label)));

        if (!normalizedQuery) return items.slice(0, 8);

        return items
            .map((entry) => {
                const title = entry.item.label.toLowerCase();
                const textContent = plainText(entry.content);
                const searchable = `${title} ${entry.item.slug} ${entry.section.toLowerCase()} ${textContent}`.toLowerCase();
                let score = searchable.includes(normalizedQuery) ? 10 : 0;
                if (title === normalizedQuery) score += 30;
                if (title.startsWith(normalizedQuery)) score += 20;
                const contentIndex = normalize(textContent).indexOf(normalize(normalizedQuery));
                const excerptStart = Math.max(0, contentIndex - 45);
                const excerpt = textContent.slice(excerptStart, excerptStart + 110);
                return { ...entry, score, excerpt };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label))
            .slice(0, 12);
    }, [query]);

    useEffect(() => {
        if (!open) return;
        setQuery('');
        setSelectedIndex(0);
        requestAnimationFrame(() => inputRef.current?.focus());
    }, [open]);

    useEffect(() => {
        setSelectedIndex((index) => Math.min(index, Math.max(results.length - 1, 0)));
    }, [results.length]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex((index) => Math.min(index + 1, results.length - 1));
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex((index) => Math.max(index - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, results.length]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-900/40 pt-24"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Search the documentation"
                className="w-full max-w-lg overflow-hidden rounded-none border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && results[selectedIndex]) {
                                window.location.href = hrefWithSearch(results[selectedIndex].href, query);
                            }
                        }}
                        aria-label="Search documentation"
                        placeholder="Search the docs..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    />
                    <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                    {results.length > 0 ? results.map((result, index) => (
                        <Link
                            key={result.item.slug}
                            href={hrefWithSearch(result.href, query)}
                            onClick={onClose}
                            className={`flex w-full items-center justify-between rounded-none px-3 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 ${index === selectedIndex ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                        >
                            <span>
                                <span className="block"><HighlightedText text={result.item.label} query={query} /></span>
                                <span className="block text-xs text-zinc-400">{result.section}</span>
                                {result.excerpt && <span className="mt-1 block line-clamp-2 text-xs text-zinc-500"><HighlightedText text={result.excerpt} query={query} /></span>}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
                        </Link>
                    )) : (
                        <p className="px-3 py-6 text-center text-sm text-zinc-500">No documentation found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
