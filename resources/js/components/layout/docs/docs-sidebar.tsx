import { useMemo, useState, useEffect, type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, X } from 'lucide-react';
import {
    NAV_SECTIONS,
    findActiveNavBranch,
    isNavItemActive,
    resolveHref,
    type NavItem,
    type NavSectionData,
} from '@/components/layout/docs/docs-data';
import { useCurrentUrl } from '@/hooks/use-current-url';

type NavLinkProps = {
    item: NavItem;
    onNavigate?: (path: string) => void;
    nested?: boolean;
    active?: boolean;
};

function NavLink({ item, onNavigate, nested = false, active = false }: NavLinkProps) {
    const href = resolveHref(item.path);

    return (
        <Link
            href={href}
            onClick={() => onNavigate?.(href)}
            className={`block rounded-md py-1.5 leading-5 transition-colors ${
                nested ? 'px-2.5 text-[12px]' : 'px-3 text-[13px]'
            } ${
                active
                    ? 'bg-red-50 font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
            }`}
        >
            {item.label}
        </Link>
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
            aria-expanded={open}
            onClick={onToggle}
            className={`flex w-full items-center justify-between py-1.5 text-zinc-400 transition-all duration-200 ease-out hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 ${
                nested ? 'px-2.5 text-[10px] font-semibold uppercase tracking-wide' : 'px-3 text-[11px] font-semibold uppercase tracking-wide'
            }`}
        >
            {label}
            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
        </button>
    );
}

type AccordionContentProps = {
    open: boolean;
    children: ReactNode;
};

function AccordionContent({ open, children }: AccordionContentProps) {
    return (
        <div className={`grid transition-all duration-200 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="pt-1">{children}</div>
            </div>
        </div>
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
    level?: number;
    open?: boolean;
    onToggle?: () => void;
    onNavigate?: (path: string) => void;
};

function NavBranch({ item, level = 0, open: controlledOpen, onToggle, onNavigate }: NavBranchProps) {
    const { currentUrl, isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const [localOpen, setLocalOpen] = useState(Boolean(item.active) || Boolean(item.children?.some((child) => child.active)));
    const hasChildren = Boolean(item.children?.length);
    const indentClass = LEVEL_INDENT_CLASSES[level] ?? 'ml-6';
    const isActive = isCurrentOrParentUrl(resolveHref(item.path), currentUrl);
    const isOpen = controlledOpen ?? (localOpen || isActive);

    return (
        <li className={`${indentClass} ${level > 0 ? 'border-l border-zinc-200 pl-2 dark:border-zinc-800' : ''}`}>
            {hasChildren ? (
                <div className="mb-1">
                    <SectionToggleButton
                        label={item.label}
                        open={isOpen}
                        onToggle={() => {
                            if (onToggle) {
                                onToggle();
                                return;
                            }
                            setLocalOpen((value) => !value);
                        }}
                        nested={level > 0}
                    />
                    <AccordionContent open={isOpen}>
                        <ul className="space-y-1">
                            {item.children?.map((child) => (
                                <NavBranch
                                    key={child.slug}
                                    item={child}
                                    level={level + 1}
                                    open={isOpen && isCurrentOrParentUrl(resolveHref(child.path), currentUrl)}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </ul>
                    </AccordionContent>
                </div>
            ) : (
                <NavLink item={item} onNavigate={onNavigate} nested={level > 0} active={isCurrentUrl(resolveHref(item.path), currentUrl)} />
            )}
        </li>
    );
}

type NavSectionProps = {
    section: NavSectionData;
    open: boolean;
    onToggle: () => void;
    onNavigate?: (path: string) => void;
};

function NavSection({ section, open, onToggle, onNavigate }: NavSectionProps) {
    const { currentUrl } = useCurrentUrl();
    const [activeItemSlug, setActiveItemSlug] = useState<string | null>(() => {
        const active = section.items.find((item) => isNavItemActive(item, currentUrl));
        return active?.slug ?? null;
    });

    // Keep the active item expanded within the currently selected section.
    useEffect(() => {
        const active = section.items.find((item) => isNavItemActive(item, currentUrl));
        setActiveItemSlug(active?.slug ?? null);
    }, [currentUrl, section]);

    const handleItemToggle = (itemSlug: string) => {
        setActiveItemSlug((current) => (current === itemSlug ? null : itemSlug));
    };

    return (
        <div className="mb-1">
            <SectionToggleButton
                label={section.label}
                open={open}
                onToggle={onToggle}
            />
            <AccordionContent open={open}>
                <ul className="space-y-0.5">
                    {section.items.map((item) => (
                        <NavBranch
                            key={item.slug}
                            item={item}
                            level={1}
                            open={activeItemSlug === item.slug}
                            onToggle={() => handleItemToggle(item.slug)}
                            onNavigate={onNavigate}
                        />
                    ))}
                </ul>
            </AccordionContent>
        </div>
    );
}

type SidebarProps = {
    open: boolean;
    onClose: () => void;
    onNavigate: (path: string) => void;
};

export function Sidebar({ open, onClose, onNavigate }: SidebarProps) {
    const { currentUrl } = useCurrentUrl();
    const currentPath = currentUrl;

    const activeSection = useMemo(() => findActiveNavBranch(currentPath).sectionLabel, [currentPath]);
    const [openSection, setOpenSection] = useState<string | null>(activeSection);

    useEffect(() => {
        setOpenSection(activeSection);
    }, [activeSection]);

    const toggleSection = (sectionLabel: string) => {
        setOpenSection((current) => (current === sectionLabel ? null : sectionLabel));
    };

    return (
        <>
            {open ? <div className="fixed inset-0 z-30 lg:hidden" onClick={onClose} /> : null}
            <aside
                className={`scrollbar-docs fixed inset-x-auto bottom-0 left-0 top-14 z-40 w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white pb-10 pt-4 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:h-[calc(100vh-3.5rem)] lg:self-start lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <nav className="z-50 px-2">
                    {NAV_SECTIONS.map((section) => (
                        <NavSection
                            key={section.label}
                            section={section}
                            open={openSection === section.label}
                            onToggle={() => toggleSection(section.label)}
                            onNavigate={onNavigate}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}
