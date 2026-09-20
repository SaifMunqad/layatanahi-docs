import { useEffect, useState } from 'react';
import { Menu, Moon, Search, SunMedium } from 'lucide-react';
import LayatanahiIcon from '@/components/icons/LayatanahiIcon.jsx';
import {Link} from "@inertiajs/react";
import layatanahi from '@/routes/layatanahi';

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
    return (
        <button
            type="button"
            onClick={onOpen}
            className="flex w-full max-w-sm items-center gap-2 rounded-0 border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
            <Search className="h-4 w-4 shrink-0 text-cyan-800 dark:text-cyan-500" />
            <span className="flex-1 text-left">Search the docs...</span>
        </button>
    );
}

type ThemeToggleProps = {
    dark: boolean;
    onToggle: () => void;
};

function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle dark mode"
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
            <div className="block">
                <Logo />
            </div>
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
                <Search className="h-5 w-5 text-cyan-800 dark:text-cyan-500" />
            </button>
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        </header>
    );
}

export { Logo, SearchBar, ThemeToggle };
