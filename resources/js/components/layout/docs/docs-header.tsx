import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Search, SunMedium } from 'lucide-react';
import LayatanahiIcon from '@/components/icons/LayatanahiIcon.jsx';
import {Link} from "@inertiajs/react";
import layatanahi from '@/routes/layatanahi';
import { useTranslation } from 'react-i18next';
import { applyDocsLocale, type DocsLocale } from '@/lib/i18n';

function Logo() {
    return (
        <Link href={layatanahi.overview()} className="flex shrink-0 items-center">
            <LayatanahiIcon className="h-7 w-auto fill-cyan-800 dark:fill-cyan-500" />
        </Link>
    );
}

type SearchBarProps = {
    onOpen: () => void;
};

function SearchBar({ onOpen }: SearchBarProps) {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            onClick={onOpen}
            className="flex w-full max-w-sm items-center gap-2 rounded-0 border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
            <Search className="h-4 w-4 shrink-0 text-cyan-800 dark:text-cyan-500" />
            <span className="flex-1 text-left">{t('searchDocs')}</span>
        </button>
    );
}

const languages = [
    { code: 'en', displayCode: 'en', label: 'English', direction: 'ltr' },
    { code: 'fa_AF', displayCode: 'dr', label: 'فارسی', direction: 'rtl' },
    { code: 'ps', displayCode: 'ps', label: 'پښتو', direction: 'rtl' },
] as const;

function LanguageMenu() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState<DocsLocale>(() => applyDocsLocale());
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDetailsElement>(null);
    const selected = languages.find((language) => language.code === current) ?? languages[0];

    useEffect(() => {
        const updateLanguage = () => setCurrent(applyDocsLocale());
        window.addEventListener('docs-locale-change', updateLanguage);
        return () => window.removeEventListener('docs-locale-change', updateLanguage);
    }, []);

    useEffect(() => {
        const closeMenu = (event: PointerEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('pointerdown', closeMenu);
        return () => document.removeEventListener('pointerdown', closeMenu);
    }, []);

    const changeLanguage = (code: (typeof languages)[number]['code']) => {
        const language = languages.find((item) => item.code === code) ?? languages[0];
        setCurrent(applyDocsLocale(language.code));
        setOpen(false);
        window.dispatchEvent(new Event('docs-locale-change'));
    };

    return (
        <details ref={menuRef} open={open} className="relative" onToggle={(event) => setOpen(event.currentTarget.open)}>
            <summary className="flex h-8 cursor-pointer list-none items-center gap-1 rounded-0 px-2 text-base text-cyan-800 hover:bg-zinc-100 dark:text-cyan-500 dark:hover:bg-zinc-800 [&::-webkit-details-marker]:hidden">
                {selected.displayCode}
                <ChevronDown className="h-3.5 w-3.5" />
            </summary>
            <div className={`absolute top-10 z-40 min-w-32 border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 ${selected.direction === 'rtl' ? 'left-0' : 'right-0'}`}>
                {languages.map((language) => (
                    <button
                        key={language.code}
                        type="button"
                        onClick={() => changeLanguage(language.code)}
                        className={`block w-full px-3 py-2 text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 ${selected.direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                        {t(`languages.${language.code}`)}
                    </button>
                ))}
            </div>
        </details>
    );
}

type ThemeToggleProps = {
    dark: boolean;
    onToggle: () => void;
};

function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={t('toggleDarkMode')}
            className="flex h-8 w-8 items-center justify-center rounded-0 text-cyan-800 hover:bg-zinc-100 dark:text-cyan-500 dark:hover:bg-zinc-800"
        >
            {mounted && dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}

type TopBarProps = {
    onMenuClick: () => void;
    onSearchClick: () => void;
    dark: boolean;
    onToggleTheme: () => void;
};

export function TopBar({ onMenuClick, onSearchClick, dark, onToggleTheme }: TopBarProps) {
    const { t } = useTranslation();
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <button
                type="button"
                onClick={onMenuClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 lg:hidden"
                aria-label={t('openNavigation')}
            >
                <Menu className="h-5 w-5" />
            </button>
            <div className="block">
                <Logo />
            </div>
            <div className="flex-1" />
            <div className="hidden flex-1 justify-center sm:flex">
                <SearchBar onOpen={onSearchClick} />
            </div>
            <button
                type="button"
                onClick={onSearchClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 sm:hidden"
                aria-label={t('searchDocumentation')}
            >
                <Search className="h-5 w-5 text-cyan-800 dark:text-cyan-500" />
            </button>
            <LanguageMenu />
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        </header>
    );
}

export { Logo, SearchBar, ThemeToggle };
