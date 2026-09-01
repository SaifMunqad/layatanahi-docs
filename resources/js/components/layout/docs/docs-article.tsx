import { useEffect, useState, type ReactNode } from 'react';
import { type Heading } from '@/lib/markdown';

/** The main documentation column. Renders page content directly (no card). */
export function Article({ children }: { children?: ReactNode }) {
    const [bottomPadding, setBottomPadding] = useState(0);

    useEffect(() => {
        const updateBottomPadding = () => {
            const article = document.querySelector('article');
            const headings = article?.querySelectorAll(
                'h1, h2, h3, h4, h5, h6',
            );
            const lastHeading = headings?.[headings.length - 1];

            if (!article || !lastHeading) {
                setBottomPadding(0);
                return;
            }

            const currentPadding =
                Number.parseFloat(getComputedStyle(article).paddingBottom) || 0;
            const articleBottom =
                article.getBoundingClientRect().bottom +
                window.scrollY -
                currentPadding;
            const lastHeadingTop =
                lastHeading.getBoundingClientRect().top + window.scrollY;
            const contentAfterHeading = articleBottom - lastHeadingTop;
            const requiredPadding =
                window.innerHeight - 96 - contentAfterHeading;

            setBottomPadding(Math.max(0, requiredPadding));
        };

        updateBottomPadding();
        window.addEventListener('resize', updateBottomPadding);

        return () => window.removeEventListener('resize', updateBottomPadding);
    }, [children]);

    return (
        <article
            className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10"
            style={{ paddingBottom: bottomPadding }}
        >
            {children}
        </article>
    );
}

type TableOfContentsProps = {
    items: Heading[];
};

/** Tracks which heading is currently in view to highlight it in the TOC. */
function useActiveHeading(ids: string[]): string | null {
    const [active, setActive] = useState<string | null>(null);
    const key = ids.join('|');

    useEffect(() => {
        if (ids.length === 0) return;

        const updateActiveHeading = () => {
            const headings = ids
                .map((id) => document.getElementById(id))
                .filter((heading): heading is HTMLElement => heading !== null);
            const offset = 96;
            const current = headings
                .filter(
                    (heading) => heading.getBoundingClientRect().top <= offset,
                )
                .at(-1);

            setActive(current?.id ?? headings[0]?.id ?? null);
        };

        updateActiveHeading();
        window.addEventListener('scroll', updateActiveHeading, {
            passive: true,
        });
        window.addEventListener('resize', updateActiveHeading);

        return () => {
            window.removeEventListener('scroll', updateActiveHeading);
            window.removeEventListener('resize', updateActiveHeading);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return active;
}

/** "On this page" navigation built from the current page's headings. */
export function TableOfContents({ items }: TableOfContentsProps) {
    const active = useActiveHeading(items.map((item) => item.id));

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pl-6 xl:block">
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                On this page
            </p>
            <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            paddingLeft: `${Math.max(item.depth - 1, 0)}rem`,
                        }}
                    >
                        <a
                            href={`#${item.id}`}
                            className={`-ml-px block border-l-2 pl-3 text-[13px] leading-5 transition-colors ${
                                active === item.id
                                    ? 'border-red-500 font-medium text-red-600 dark:border-red-400 dark:text-red-400'
                                    : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-100'
                            }`}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
