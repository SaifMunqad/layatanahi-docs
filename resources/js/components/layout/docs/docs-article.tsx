import { useEffect, useRef, useState, type ReactNode } from 'react';
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
function useActiveHeading(ids: string[]): {
    active: string | null;
    direction: 'down' | 'up' | null;
} {
    const [active, setActive] = useState<string | null>(null);
    const [direction, setDirection] = useState<'down' | 'up' | null>(null);
    const key = ids.join('|');

    useEffect(() => {
        if (ids.length === 0) return;

        let previousScrollY = window.scrollY;

        const updateActiveHeading = () => {
            const currentScrollY = window.scrollY;
            const hasScrolled = currentScrollY !== previousScrollY;
            const scrollDirection = currentScrollY > previousScrollY ? 'down' : 'up';

            previousScrollY = currentScrollY;

            const headings = ids
                .map((id) => document.getElementById(id))
                .filter((heading): heading is HTMLElement => heading !== null);
            const offset = 96;
            const current = headings
                .filter(
                    (heading) => heading.getBoundingClientRect().top <= offset,
                )
                .at(-1);

            const nextActive = current?.id ?? headings[0]?.id ?? null;

            setActive((previousActive) => {
                if (nextActive !== previousActive && hasScrolled) {
                    setDirection(scrollDirection);
                }

                return nextActive;
            });
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

    return { active, direction };
}

/** "On this page" navigation built from the current page's headings. */
export function TableOfContents({ items }: TableOfContentsProps) {
    const { active, direction } = useActiveHeading(items.map((item) => item.id));
    const navigationRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!active || !direction || !navigationRef.current) return;

        const navigation = navigationRef.current;
        const link = navigation.querySelector<HTMLElement>(
            `[data-toc-id="${CSS.escape(active)}"]`,
        );

        if (!link) return;

        const targetPosition =
            direction === 'down'
                ? navigation.clientHeight * 0.85
                : navigation.clientHeight * 0.15;
        const navigationRect = navigation.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const linkPosition = linkRect.top - navigationRect.top;
        const targetScrollTop = navigation.scrollTop + linkPosition - targetPosition;
        const maxScrollTop = navigation.scrollHeight - navigation.clientHeight;

        if (Math.abs(targetScrollTop - navigation.scrollTop) < 4) return;

        navigation.scrollTo({
            top: Math.max(0, Math.min(targetScrollTop, maxScrollTop)),
            behavior: 'smooth',
        });
    }, [active, direction]);

    if (items.length === 0) return null;

    return (
        <nav ref={navigationRef} className="scrollbar-docs sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pl-6 xl:block">
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                On this page
            </p>
            <ul className="space-y-2 border-s border-gray-200 dark:border-gray-800">
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            paddingLeft: `${Math.max(item.depth - 1, 0)}rem`,
                        }}
                    >
                        <a
                            href={`#${item.id}`}
                            data-toc-id={item.id}
                            className={`-ms-px block border-s-2 ps-3 text-[13px] leading-5 transition-colors ${
                                active === item.id
                                    ? 'border-cyan-500 font-medium text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:border-gray-600 dark:hover:text-gray-100'
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
