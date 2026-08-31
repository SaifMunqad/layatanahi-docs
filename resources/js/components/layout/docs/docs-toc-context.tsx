import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Heading } from '@/lib/markdown';

type TocContextValue = {
    headings: Heading[];
    setHeadings: (headings: Heading[]) => void;
};

const TocContext = createContext<TocContextValue | null>(null);

/**
 * Holds the table-of-contents headings for the currently rendered docs page.
 * The persistent layout owns the state; each page publishes its own headings.
 */
export function TocProvider({ children }: { children: ReactNode }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    return <TocContext.Provider value={{ headings, setHeadings }}>{children}</TocContext.Provider>;
}

/** Reads the current page headings (used by the on-this-page navigation). */
export function useTocHeadings(): Heading[] {
    return useContext(TocContext)?.headings ?? [];
}

/** Publishes the given headings to the layout while the page is mounted. */
export function usePublishToc(headings: Heading[]): void {
    const context = useContext(TocContext);

    useEffect(() => {
        context?.setHeadings(headings);
        return () => context?.setHeadings([]);
    }, [context, headings]);
}
