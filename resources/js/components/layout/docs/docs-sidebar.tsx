import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { NAV_SECTIONS, type NavItem, type NavSectionData } from '@/components/layout/docs/docs-data';

type NavLinkProps = {
    item: NavItem;
    onNavigate?: (slug: string) => void;
};

function NavLink({ item, onNavigate }: NavLinkProps) {
    return (
        <li>
            <a
                href={`#${item.slug}`}
                onClick={() => onNavigate?.(item.slug)}
                className={`block rounded-md px-3 py-1.5 text-[13px] leading-5 transition-colors ${
                    item.active
                        ? 'bg-red-50 font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
            >
                {item.label}
            </a>
        </li>
    );
}

type NavSectionProps = {
    section: NavSectionData;
    defaultOpen: boolean;
    onNavigate?: (slug: string) => void;
};

function NavSection({ section, defaultOpen, onNavigate }: NavSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="mb-1">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
                {section.label}
                <ChevronDown className={`h-3 w-3 transition-transform ${open ? '' : '-rotate-90'}`} />
            </button>
            {open && (
                <ul className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                        <NavLink key={item.slug} item={item} onNavigate={onNavigate} />
                    ))}
                </ul>
            )}
        </div>
    );
}

type SidebarProps = {
    open: boolean;
    onClose: () => void;
    onNavigate: (slug: string) => void;
};

export function Sidebar({ open, onClose, onNavigate }: SidebarProps) {
    return (
        <>
            {open && <div className="fixed inset-0 z-30 bg-zinc-900/40 lg:hidden" onClick={onClose} />}
            <aside
                className={`sticky left-0 z-10 h-[calc(100vh-3.5rem)] w-64 shrink-0 self-start overflow-y-auto border-r border-zinc-200 bg-white pb-10 pt-4 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:top-14 lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-4 pb-4 lg:hidden">
                    <a href="#" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                        <span className="text-[15px] font-semibold tracking-tight">Layatanahi</span>
                    </a>
                    <button type="button" onClick={onClose} className="text-zinc-400">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="z-50 px-2">
                    {NAV_SECTIONS.map((section, i) => (
                        <NavSection
                            key={section.label}
                            section={section}
                            defaultOpen={i < 2}
                            onNavigate={onNavigate}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}
