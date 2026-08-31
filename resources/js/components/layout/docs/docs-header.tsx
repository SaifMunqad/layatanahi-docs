import { useState } from 'react';
import {
    ChevronDown,
    Menu,
    Moon,
    Search,
    SunMedium,
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

const VERSIONS = ['13.x', '12.x', '11.x', '10.x'];

function Logo() {
    return (
        <a href="#" className="flex shrink-0 items-center gap-2">
            <AppLogoIcon className="h-6 w-auto text-red-600" />
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Layatanahi
            </span>
        </a>
    );
}

function VersionSwitcher() {
    const [open, setOpen] = useState(false);
    const [version, setVersion] = useState('13.x');

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
            >
                v{version}
                <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
                <div className="absolute left-0 top-8 z-30 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    {VERSIONS.map((v) => (
                        <button
                            key={v}
                            type="button"
                            onClick={() => {
                                setVersion(v);
                                setOpen(false);
                            }}
                            className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                                v === version
                                    ? 'font-semibold text-red-600'
                                    : 'text-zinc-600 dark:text-zinc-400'
                            }`}
                        >
                            v{v}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

type SearchBarProps = {
    onOpen: () => void;
};

function SearchBar({ onOpen }: SearchBarProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="flex w-full max-w-sm items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search the docs...</span>
            <kbd className="hidden rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 sm:inline">
                &#8984;K
            </kbd>
        </button>
    );
}

type ThemeToggleProps = {
    dark: boolean;
    onToggle: () => void;
};

function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
            {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <button
                type="button"
                onClick={onMenuClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 lg:hidden"
                aria-label="Open navigation"
            >
                <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:block">
                <Logo />
            </div>
            <VersionSwitcher />
            <div className="flex-1" />
            <div className="hidden flex-1 sm:block">
                <SearchBar onOpen={onSearchClick} />
            </div>
            <button
                type="button"
                onClick={onSearchClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 sm:hidden"
                aria-label="Search"
            >
                <Search className="h-5 w-5" />
            </button>
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        </header>
    );
}

export { Logo, SearchBar, ThemeToggle, VersionSwitcher };
