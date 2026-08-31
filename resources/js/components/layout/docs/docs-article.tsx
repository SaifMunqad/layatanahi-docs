import { useEffect, useState, type ReactNode } from 'react';
import { type Heading } from '@/lib/markdown';

/** The main documentation column. Renders page content directly (no card). */
export function Article({ children }: { children?: ReactNode }) {
    return <article className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10">{children}</article>;
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

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0 },
        );

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
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
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                On this page
            </p>
            <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: `${Math.max(item.depth - 1, 0)}rem` }}>
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
