import {useMemo, useState} from "react";
import SearchOutlineIcon from "%/Icons/SearchOutlineIcon.jsx";
import HamburgerMenuIcon from "%/Icons/GeneralIcons/HamburgerMenuIcon.jsx";
import XIcon from "%/Icons/GeneralIcons/XIcon.jsx";
import DownIcon from "%/Icons/GeneralIcons/DownIcon.jsx";
import DarkModeIcon from "%/Icons/DarkModeIcon.jsx";
import SunIcon from "%/Icons/SunIcon.jsx";
import LayatanahiIcon from "%/Icons/LayatanahiIcon.jsx";
import AddClipboardIcon from "%/Icons/AddClipboardIcon.jsx";
import CircleTickIcon from "%/Icons/GeneralIcons/CircleTickIcon.jsx";
import ArrowLeftIcon from "%/Icons/GeneralIcons/ArrowLeftIcon.jsx";
import ArrowRightIcon from "%/Icons/GeneralIcons/ArrowRightIcon.jsx";
import ArrowTopRightOnSquareIcon from "%/Icons/GeneralIcons/ArrowTopRightOnSquareIcon.jsx";

/* -------------------------------------------------------------------------
 * DATA
 * In a real app this would come from a CMS, markdown files, or a JSON index
 * generated at build time. Kept inline here so the layout is self contained.
 * ---------------------------------------------------------------------- */

const NAV_SECTIONS = [
    {
        label: "Prologue",
        items: [
            {label: "Release Notes", slug: "release-notes"},
            {label: "Upgrade Guide", slug: "upgrade-guide"},
            {label: "Contribution Guide", slug: "contributions"},
        ],
    },
    {
        label: "Getting Started",
        items: [
            {label: "Installation", slug: "installation", active: true},
            {label: "Configuration", slug: "configuration"},
            {label: "Directory Structure", slug: "structure"},
            {label: "Frontend", slug: "frontend"},
            {label: "Starter Kits", slug: "starter-kits"},
            {label: "Deployment", slug: "deployment"},
        ],
    },
    {
        label: "Architecture Concepts",
        items: [
            {label: "Request Lifecycle", slug: "lifecycle"},
            {label: "Service Container", slug: "container"},
            {label: "Service Providers", slug: "providers"},
            {label: "Facades", slug: "facades"},
        ],
    },
    {
        label: "The Basics",
        items: [
            {label: "Routing", slug: "routing"},
            {label: "Middleware", slug: "middleware"},
            {label: "Controllers", slug: "controllers"},
            {label: "Requests", slug: "requests"},
            {label: "Responses", slug: "responses"},
            {label: "Views", slug: "views"},
            {label: "Blade Templates", slug: "blade"},
        ],
    },
    {
        label: "Database",
        items: [
            {label: "Getting Started", slug: "database"},
            {label: "Query Builder", slug: "queries"},
            {label: "Migrations", slug: "migrations"},
            {label: "Seeding", slug: "seeding"},
        ],
    },
    {
        label: "Eloquent ORM",
        items: [
            {label: "Getting Started", slug: "eloquent"},
            {label: "Relationships", slug: "eloquent-relationships"},
            {label: "Collections", slug: "eloquent-collections"},
        ],
    },
];

const TOC_ITEMS = [
    {label: "Meet Laravel", depth: 1, id: "meet-laravel"},
    {label: "Why Laravel?", depth: 2, id: "why-laravel"},
    {label: "Creating an application", depth: 1, id: "creating"},
    {label: "Installing PHP and the installer", depth: 2, id: "installing-php"},
    {label: "Initial configuration", depth: 1, id: "initial-config"},
    {label: "Environment based configuration", depth: 2, id: "env-config"},
    {label: "Databases and migrations", depth: 2, id: "db-migrations"},
    {label: "Next steps", depth: 1, id: "next-steps"},
];

const VERSIONS = ["13.x", "12.x", "11.x", "10.x"];

/* -------------------------------------------------------------------------
 * SMALL PRESENTATIONAL COMPONENTS
 * ---------------------------------------------------------------------- */

function Logo() {
    return (
        <a href="#" className="flex items-center gap-2 shrink-0">
            <LayatanahiIcon className="h-6 w-auto text-red-600"/>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Layatanahi
            </span>
        </a>
    );
}

function VersionSwitcher() {
    const [open, setOpen] = useState(false);
    const [version, setVersion] = useState("13.x");

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
            >
                v{version}
                <DownIcon className="h-3 w-3"/>
            </button>
            {open && (
                <div
                    className="absolute left-0 top-8 z-30 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    {VERSIONS.map((v) => (
                        <button
                            key={v}
                            onClick={() => {
                                setVersion(v);
                                setOpen(false);
                            }}
                            className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                                v === version
                                    ? "font-semibold text-red-600"
                                    : "text-zinc-600 dark:text-zinc-400"
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

function SearchBar({onOpen}) {
    return (
        <button
            onClick={onOpen}
            className="flex w-full max-w-sm items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
            <SearchOutlineIcon className="h-4 w-4 shrink-0"/>
            <span className="flex-1 text-left">Search the docs...</span>
            <kbd
                className="hidden rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 sm:inline">
                &#8984;K
            </kbd>
        </button>
    );
}

function SearchModal({open, onClose}) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-900/40 pt-24"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <SearchOutlineIcon className="h-4 w-4 text-zinc-400"/>
                    <input
                        autoFocus
                        placeholder="Search the docs..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    />
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                        <XIcon className="h-4 w-4"/>
                    </button>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                    {["Installation", "Routing", "Eloquent: Getting Started", "Middleware"].map(
                        (r) => (
                            <button
                                key={r}
                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                {r}
                                <ArrowRightIcon className="h-3.5 w-3.5 text-zinc-300"/>
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

function ThemeToggle({dark, onToggle}) {
    return (
        <button
            onClick={onToggle}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
            {dark ? <SunIcon className="h-4 w-4"/> : <DarkModeIcon className="h-4 w-4"/>}
        </button>
    );
}

/* -------------------------------------------------------------------------
 * NAVIGATION (SIDEBAR)
 * ---------------------------------------------------------------------- */

function NavLink({item, onNavigate}) {
    return (
        <li>
            <a
                href={`#${item.slug}`}
                onClick={() => onNavigate?.(item.slug)}
                className={`block rounded-md px-3 py-1.5 text-[13px] leading-5 transition-colors ${
                    item.active
                        ? "bg-red-50 font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
            >
                {item.label}
            </a>
        </li>
    );
}

function NavSection({section, defaultOpen, onNavigate}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="mb-1">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
                {section.label}
                <DownIcon
                    className={`h-3 w-3 transition-transform ${open ? "" : "-rotate-90"}`}
                />
            </button>
            {open && (
                <ul className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                        <NavLink key={item.slug} item={item} onNavigate={onNavigate}/>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Sidebar({open, onClose, onNavigate}) {
    return (
        <>
            {/* mobile backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-zinc-900/40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`sticky inset-y-0 left-0 z-20 w-64 shrink-0 transform overflow-y-auto border-r border-zinc-200 bg-white pb-10 pt-4 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:static lg:translate-x-0 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-4 pb-4 lg:hidden">
                    <Logo/>
                    <button onClick={onClose} className="text-zinc-400">
                        <XIcon className="h-5 w-5"/>
                    </button>
                </div>
                <nav className="px-2 z-50">
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

/* -------------------------------------------------------------------------
 * TOP BAR
 * ---------------------------------------------------------------------- */

function TopBar({onMenuClick, onSearchClick, dark, onToggleTheme}) {
    return (
        <header
            className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <button
                onClick={onMenuClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 lg:hidden"
                aria-label="Open navigation"
            >
                <HamburgerMenuIcon className="h-5 w-5"/>
            </button>
            <div className="hidden lg:block">
                <Logo/>
            </div>
            <VersionSwitcher/>
            <div className="flex-1"/>
            <div className="hidden flex-1 sm:block">
                <SearchBar onOpen={onSearchClick}/>
            </div>
            <button
                onClick={onSearchClick}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 sm:hidden"
                aria-label="Search"
            >
                <SearchOutlineIcon className="h-5 w-5"/>
            </button>
            <ThemeToggle dark={dark} onToggle={onToggleTheme}/>
        </header>
    );
}

/* -------------------------------------------------------------------------
 * ARTICLE CONTENT PRIMITIVES
 * ---------------------------------------------------------------------- */

function CodeBlock({code, lang = "bash"}) {
    const [copied, setCopied] = useState(false);
    const lines = code.trim().split("\n");

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="group relative my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
          {lang}
        </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300"
                >
                    {copied ? (
                        <>
                            <CircleTickIcon className="h-3 w-3"/> Copied
                        </>
                    ) : (
                        <>
                            <AddClipboardIcon className="h-3 w-3"/> Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-6">
        {lines.map((line, i) => (
            <div key={i} className="font-mono text-zinc-300">
                {line || "\u00A0"}
            </div>
        ))}
      </pre>
        </div>
    );
}

function Callout({type = "note", children}) {
    const styles = {
        note: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300",
        warning:
            "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    };
    const labels = {note: "Note", warning: "Warning"};

    return (
        <div className={`my-4 rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>
            <p className="mb-1 font-semibold">{labels[type]}</p>
            <p className="leading-6 opacity-90">{children}</p>
        </div>
    );
}

function Heading({id, level, children}) {
    const Tag = `h${level}`;
    const sizes = {
        1: "text-3xl mt-0 mb-4",
        2: "text-xl mt-10 mb-3 pt-2 border-t border-zinc-100 dark:border-zinc-800",
        3: "text-base mt-8 mb-2",
    };
    return (
        <Tag
            id={id}
            className={`group scroll-mt-20 font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 ${sizes[level]}`}
        >
            <a href={`#${id}`} className="no-underline">
                {children}
                <span className="ml-2 hidden text-red-500 group-hover:inline">#</span>
            </a>
        </Tag>
    );
}

function InlineCode({children}) {
    return (
        <code
            className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-red-700 dark:bg-zinc-800 dark:text-red-400">
            {children}
        </code>
    );
}

/* -------------------------------------------------------------------------
 * ON-THIS-PAGE TABLE OF CONTENTS
 * ---------------------------------------------------------------------- */

function TableOfContents({items}) {
    return (
        <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pl-6 xl:block">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                On this page
            </p>
            <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
                {items.map((item) => (
                    <li key={item.id} style={{paddingLeft: item.depth === 2 ? "1.5rem" : "1rem"}}>
                        <a
                            href={`#${item.id}`}
                            className="-ml-px block border-l-2 border-transparent pl-3 text-[13px] leading-5 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

/* -------------------------------------------------------------------------
 * PAGE FOOTER NAV (prev / next)
 * ---------------------------------------------------------------------- */

function PageNav() {
    return (
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <a
                href="#release-notes"
                className="group flex flex-col rounded-lg border border-zinc-200 p-4 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
        <span className="flex items-center gap-1 text-xs text-zinc-400">
          <ArrowLeftIcon className="h-3 w-3"/> Previous
        </span>
                <span className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Release Notes
        </span>
            </a>
            <a
                href="#configuration"
                className="group flex flex-col items-end rounded-lg border border-zinc-200 p-4 text-right hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
        <span className="flex items-center gap-1 text-xs text-zinc-400">
          Next <ArrowRightIcon className="h-3 w-3"/>
        </span>
                <span className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Configuration
        </span>
            </a>
        </div>
    );
}

/* -------------------------------------------------------------------------
 * ARTICLE (the actual documentation page content)
 * ---------------------------------------------------------------------- */

function Article() {
    return (
        <article className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10">
            <p className="mb-2 text-sm font-medium text-red-600">Getting Started</p>
            <Heading id="meet-laravel" level={1}>
                Installation
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Laravel is a web application framework built around expressive, readable
                syntax. It gives you a solid starting point &mdash; routing, an ORM,
                queues, testing helpers, and more &mdash; so you can spend your time on
                the parts of your application that are actually unique.
            </p>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Whether this is your first framework or your fifteenth, the docs are
                organized so you can move from a blank folder to a running application
                in a few minutes, then go as deep as you need on any topic.
            </p>

            <Heading id="why-laravel" level={2}>
                Why Laravel?
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                There is no shortage of tools for building on the web. Laravel's pitch
                is consistency: predictable file locations, expressive helpers for
                everyday tasks, and a large ecosystem of official packages that cover
                the things almost every application eventually needs, like queues,
                search, and billing.
            </p>

            <Callout type="note">
                New to PHP entirely? The framework is written to be approachable &mdash;
                you do not need years of experience to build something real with it.
            </Callout>

            <Heading id="creating" level={1}>
                Creating a Laravel application
            </Heading>

            <Heading id="installing-php" level={2}>
                Installing PHP and the installer
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Before scaffolding your first project, make sure PHP, Composer, and the
                Laravel installer are available on your machine. On macOS or Linux, a
                single command handles all three:
            </p>

            <CodeBlock code={`curl -fsSL https://php.new/install/mac/8.5 | bash`}/>

            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Once installed, creating a new project is a single command away. The
                installer will ask a few questions about testing frameworks and
                starter kits along the way.
            </p>

            <CodeBlock
                code={`laravel new example-app\ncd example-app\nnpm install && npm run build\ncomposer run dev`}/>

            <Callout type="warning">
                Avoid serving your application from inside a subdirectory of the
                project. Doing so can expose files that were never meant to be public.
            </Callout>

            <Heading id="initial-config" level={1}>
                Initial configuration
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Every configuration file lives under <InlineCode>config/</InlineCode>{" "}
                and is commented, so browsing them is a good way to learn what is
                available. Out of the box the defaults are sensible enough that you
                rarely need to touch anything before you start building.
            </p>

            <Heading id="env-config" level={2}>
                Environment based configuration
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                Values that differ between your laptop and a production server &mdash;
                database credentials, API keys, debug flags &mdash; live in an{" "}
                <InlineCode>.env</InlineCode> file at the project root rather than in
                the config files themselves. This file should never be committed to
                source control.
            </p>

            <Heading id="db-migrations" level={2}>
                Databases and migrations
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                A fresh install is preconfigured to use SQLite, with a database file
                and the framework's own tables already created for you. Switching to
                MySQL or PostgreSQL just means updating a handful of variables:
            </p>

            <CodeBlock
                lang="env"
                code={`DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=laravel\nDB_USERNAME=root\nDB_PASSWORD=`}
            />

            <Heading id="next-steps" level={1}>
                Next steps
            </Heading>
            <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                From here, most people branch in one of two directions: using Laravel
                as a full-stack framework with Blade or Inertia, or using it purely as
                an API backend for a separate frontend application. Either path is
                well supported &mdash; pick the one that matches what you are
                building and follow the relevant guide.
            </p>

            <ul className="mb-4 list-disc space-y-1 pl-5 leading-7 text-zinc-600 dark:text-zinc-400">
                <li>Request lifecycle</li>
                <li>Directory structure</li>
                <li>Frontend</li>
                <li>Service container</li>
            </ul>

            <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
                Read the full framework documentation
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5"/>
            </a>

            <PageNav/>
        </article>
    );
}

/* -------------------------------------------------------------------------
 * ROOT LAYOUT
 * ---------------------------------------------------------------------- */

export default function DocsLayout() {
    const [dark, setDark] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const toc = useMemo(() => TOC_ITEMS, []);

    return (
        <div className={dark ? "dark" : ""}>
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
                        <Article/>
                        <TableOfContents items={toc}/>
                    </div>
                </div>

                <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)}/>
            </div>
        </div>
    );
}
