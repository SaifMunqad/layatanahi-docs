import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { usePublishToc } from '@/components/layout/docs/docs-toc-context';
import { useMarkdown } from '@/lib/markdown';

const localizedMarkdown = import.meta.glob('../../../docs/{en,fa_AF,ps}/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

type DocsPageProps = {
    markdown: string;
    section?: string;
    title?: string;
    description?: string;
};

export default function DocsPage({ markdown, section, description }: DocsPageProps) {
    const [locale, setLocale] = useState(() => localStorage.getItem('docs-locale') ?? 'en');
    const pagePath = window.location.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '') || 'overview';
    const localizedSource = localizedMarkdown[`../../../docs/${locale}/${pagePath}.md`]
        ?? localizedMarkdown[`../../../docs/en/${pagePath}.md`]
        ?? markdown;
    const { headings, content } = useMarkdown(localizedSource);
    const contentRef = useRef<HTMLElement>(null);

    // Publish the page headings so the layout can build the "on this page" nav.
    usePublishToc(headings);

    useEffect(() => {
        const updateLocale = () => setLocale(localStorage.getItem('docs-locale') ?? 'en');
        window.addEventListener('docs-locale-change', updateLocale);
        return () => window.removeEventListener('docs-locale-change', updateLocale);
    }, []);

    const title = headings.find((heading) => heading.depth === 1)?.label ?? 'Documentation';

    useEffect(() => {
        const query = new URLSearchParams(window.location.search).get('search')?.trim();
        const container = contentRef.current;
        if (!query || !container) return;

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matcher = new RegExp(escapedQuery, 'i');
        const pageHeadings = Array.from(container.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));
        const matchingHeading = pageHeadings.find((heading) => matcher.test(heading.textContent ?? ''));
        let cleanup: (() => void) | undefined;

        if (matchingHeading) {
            matchingHeading.classList.add('text-cyan-600', 'dark:text-cyan-400', 'transition-colors', 'duration-300');
            cleanup = () => matchingHeading.classList.remove('text-cyan-600', 'dark:text-cyan-400');
        } else {
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
            let node: Text | null;
            while ((node = walker.nextNode() as Text | null)) {
                const value = node.nodeValue ?? '';
                const match = value.match(matcher);
                if (!match || !node.parentElement) continue;

                const highlight = document.createElement('span');
                highlight.className = 'text-cyan-600 transition-colors duration-300 dark:text-cyan-400';
                const range = document.createRange();
                range.setStart(node, match.index ?? 0);
                range.setEnd(node, (match.index ?? 0) + match[0].length);
                range.surroundContents(highlight);
                cleanup = () => highlight.replaceWith(document.createTextNode(highlight.textContent ?? ''));
                break;
            }
        }

        const target = matchingHeading ?? container.querySelector<HTMLElement>('.text-cyan-600');
        const animationFrame = window.requestAnimationFrame(() => target?.scrollIntoView({ behavior: 'smooth', block: 'center' }));

        const timeout = window.setTimeout(() => cleanup?.(), 2000);
        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.clearTimeout(timeout);
            cleanup?.();
        };
    }, [markdown]);

    return (
        <>
            <Head title={title} />

            {section && (
                <p className="mb-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">{section}</p>
            )}

            <article ref={contentRef}>{content}</article>

            {description && (
                <p className="sr-only">{description}</p>
            )}
        </>
    );
}
