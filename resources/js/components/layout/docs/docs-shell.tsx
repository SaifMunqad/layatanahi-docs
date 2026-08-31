import { useMemo, useState, type ReactNode } from 'react';
import { Article, TableOfContents } from '@/components/layout/docs/docs-article';
import { TopBar } from '@/components/layout/docs/docs-header';
import { SearchModal } from '@/components/layout/docs/docs-search-modal';
import { Sidebar } from '@/components/layout/docs/docs-sidebar';
import { TOC_ITEMS } from '@/components/layout/docs/docs-data';

export default function DocsLayout({ children }: { children?: ReactNode }) {
    const [dark, setDark] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const toc = useMemo(() => TOC_ITEMS, []);

    return (
        <div className={dark ? 'dark' : ''}>
            <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
                <TopBar
                    onMenuClick={() => setMobileNavOpen(true)}
                    onSearchClick={() => setSearchOpen(true)}
                    dark={dark}
                    onToggleTheme={() => setDark((v) => !v)}
                />

                <div className="mx-auto flex max-w-7xl">
                    <Sidebar
                        open={mobileNavOpen}
                        onClose={() => setMobileNavOpen(false)}
                        onNavigate={() => setMobileNavOpen(false)}
                    />

                    <div className="flex min-w-0 flex-1 justify-center">
                        <Article>{children}</Article>
                        <TableOfContents items={toc} />
                    </div>
                </div>

                <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
            </div>
        </div>
    );
}
