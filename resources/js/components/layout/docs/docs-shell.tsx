import { useState, type ReactNode } from 'react';
import { Article, TableOfContents } from '@/components/layout/docs/docs-article';
import { TopBar } from '@/components/layout/docs/docs-header';
import { SearchModal } from '@/components/layout/docs/docs-search-modal';
import { Sidebar } from '@/components/layout/docs/docs-sidebar';
import { TocProvider, useTocHeadings } from '@/components/layout/docs/docs-toc-context';
import { useAppearance } from '@/hooks/use-appearance';

function DocsShellContent({ children }: { children?: ReactNode }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const headings = useTocHeadings();
    const dark = resolvedAppearance === 'dark';

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <TopBar
                onMenuClick={() => setMobileNavOpen(true)}
                onSearchClick={() => setSearchOpen(true)}
                dark={dark}
                onToggleTheme={() => updateAppearance(dark ? 'light' : 'dark')}
            />

            <div className="mx-auto flex max-w-7xl">
                <Sidebar
                    open={mobileNavOpen}
                    onClose={() => setMobileNavOpen(false)}
                    onNavigate={() => undefined}
                />

                <div className="flex min-w-0 flex-1 justify-center">
                    <Article>{children}</Article>
                    <TableOfContents items={headings} />
                </div>
            </div>

            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
    );
}

export default function DocsLayout({ children }: { children?: ReactNode }) {
    return (
        <TocProvider>
            <DocsShellContent>{children}</DocsShellContent>
        </TocProvider>
    );
}
