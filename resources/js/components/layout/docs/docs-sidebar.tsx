import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { NAV_SECTIONS, type NavItem, type NavSectionData } from '@/components/layout/docs/docs-data';

type NavLinkProps = {
    item: NavItem;
    onNavigate?: (slug: string) => void;
    nested?: boolean;
};

function NavLink({ item, onNavigate, nested = false }: NavLinkProps) {
    return (
        <a
            href={`#${item.slug}`}
            onClick={() => onNavigate?.(item.slug)}
            className={`block rounded-md py-1.5 leading-5 transition-colors ${
                nested ? 'px-2.5 text-[12px]' : 'px-3 text-[13px]'
            } ${
                item.active
                    ? 'bg-red-50 font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
            }`}
        >
            {item.label}
        </a>
    );
}

type SectionToggleButtonProps = {
    label: string;
    open: boolean;
    onToggle: () => void;
    nested?: boolean;
};

function SectionToggleButton({ label, open, onToggle, nested = false }: SectionToggleButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`flex w-full items-center justify-between py-1.5 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 ${
                nested
                    ? 'px-2.5 text-[10px] font-semibold uppercase tracking-wide'
                    : 'px-3 text-[11px] font-semibold uppercase tracking-wide'
            }`}
        >
            {label}
            <ChevronDown className={`h-3 w-3 transition-transform ${open ? '' : '-rotate-90'}`} />
        </button>
    );
}

const LEVEL_INDENT_CLASSES: Record<number, string> = {
    0: '',
    1: 'ml-2',
    2: 'ml-4',
    3: 'ml-6',
};

type NavBranchProps = {
    item: NavItem;
    defaultOpen?: boolean;
    level?: number;
    onNavigate?: (slug: string) => void;
};

function NavBranch({ item, defaultOpen = false, level = 0, onNavigate }: NavBranchProps) {
    const [open, setOpen] = useState(defaultOpen || Boolean(item.active));
    const hasChildren = Boolean(item.children?.length);
    const indentClass = LEVEL_INDENT_CLASSES[level] ?? 'ml-6';

    return (
        <li className={`${indentClass} ${level > 0 ? 'border-l border-zinc-200 pl-2 dark:border-zinc-800' : ''}`}>
            {hasChildren ? (
                <div className="mb-1">
                    <SectionToggleButton
                        label={item.label}
                        open={open}
                        onToggle={() => setOpen((value) => !value)}
                        nested={level > 0}
                    />
                    {open ? (
                        <ul className="mt-1 space-y-1">
                            {item.children?.map((child) => (
                                <NavBranch
                                    key={child.slug}
                                    item={child}
                                    defaultOpen={Boolean(child.active)}
                                    level={level + 1}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </ul>
                    ) : null}
                </div>
            ) : (
                <NavLink item={item} onNavigate={onNavigate} nested={level > 0} />
            )}
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
            <SectionToggleButton label={section.label} open={open} onToggle={() => setOpen((value) => !value)} />
            {open ? (
                <ul className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                        <NavBranch
                            key={item.slug}
                            item={item}
                            defaultOpen={Boolean(item.active)}
                            level={1}
                            onNavigate={onNavigate}
                        />
                    ))}
                </ul>
            ) : null}
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
            {open ? <div className="fixed inset-0 z-30 bg-zinc-900/40 lg:hidden" onClick={onClose} /> : null}
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
