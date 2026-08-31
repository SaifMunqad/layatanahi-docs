import { type ElementType, type ReactNode } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Clipboard,
} from 'lucide-react';
import { type TocItem } from '@/components/layout/docs/docs-data';

type CodeBlockProps = {
    code: string;
    lang?: string;
};

function CodeBlock({ code, lang = 'bash' }: CodeBlockProps) {
    const lines = code.trim().split('\n');

    return (
        <div className="group relative my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">{lang}</span>
                <button
                    type="button"
                    className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300"
                    onClick={() => navigator.clipboard?.writeText(code)}
                >
                    {navigator.clipboard ? (
                        <>
                            <Clipboard className="h-3 w-3" /> Copy
                        </>
                    ) : (
                        <>
                            <Check className="h-3 w-3" /> Copied
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-6">
                {lines.map((line, i) => (
                    <div key={i} className="font-mono text-zinc-300">
                        {line || '\u00A0'}
                    </div>
                ))}
            </pre>
        </div>
    );
}

type CalloutProps = {
    type?: 'note' | 'warning';
    children: ReactNode;
};

function Callout({ type = 'note', children }: CalloutProps) {
    const styles: Record<NonNullable<CalloutProps['type']>, string> = {
        note: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300',
        warning:
            'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300',
    };
    const labels: Record<NonNullable<CalloutProps['type']>, string> = {
        note: 'Note',
        warning: 'Warning',
    };

    return (
        <div className={`my-4 rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>
            <p className="mb-1 font-semibold">{labels[type]}</p>
            <p className="leading-6 opacity-90">{children}</p>
        </div>
    );
}

type HeadingProps = {
    id: string;
    level: 1 | 2 | 3;
    children: ReactNode;
};

function Heading({ id, level, children }: HeadingProps) {
    const Tag = `h${level}` as ElementType;
    const sizes: Record<HeadingProps['level'], string> = {
        1: 'text-3xl mt-0 mb-4',
        2: 'text-xl mt-10 mb-3 pt-2 border-t border-zinc-100 dark:border-zinc-800',
        3: 'text-base mt-8 mb-2',
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

type InlineCodeProps = {
    children: ReactNode;
};

function InlineCode({ children }: InlineCodeProps) {
    return (
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-red-700 dark:bg-zinc-800 dark:text-red-400">
            {children}
        </code>
    );
}

type TableOfContentsProps = {
    items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
    return (
        <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pl-6 xl:block">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                On this page
            </p>
            <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.depth === 2 ? '1.5rem' : '1rem' }}>
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

function PageNav() {
    return (
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <a
                href="#release-notes"
                className="group flex flex-col rounded-lg border border-zinc-200 p-4 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <ArrowLeft className="h-3 w-3" /> Previous
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
                    Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Configuration
                </span>
            </a>
        </div>
    );
}

export function Article({ children }: { children?: ReactNode }) {
    return (
        <article className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10">
            {children ?? (
                <>
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

                    <CodeBlock code={`curl -fsSL https://php.new/install/mac/8.5 | bash`} />

                    <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                        Once installed, creating a new project is a single command away. The
                        installer will ask a few questions about testing frameworks and
                        starter kits along the way.
                    </p>

                    <CodeBlock code={`laravel new example-app\ncd example-app\nnpm install && npm run build\ncomposer run dev`} />

                    <Callout type="warning">
                        Avoid serving your application from inside a subdirectory of the
                        project. Doing so can expose files that were never meant to be public.
                    </Callout>

                    <Heading id="initial-config" level={1}>
                        Initial configuration
                    </Heading>
                    <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                        Every configuration file lives under <InlineCode>config/</InlineCode>{' '}
                        and is commented, so browsing them is a good way to learn what is
                        available. Out of the box the defaults are sensible enough that you
                        rarely need to touch anything before you start building.
                    </p>

                    <Heading id="env-config" level={2}>
                        Environment based configuration
                    </Heading>
                    <p className="mb-4 leading-7 text-zinc-600 dark:text-zinc-400">
                        Values that differ between your laptop and a production server &mdash;
                        database credentials, API keys, debug flags &mdash; live in an{' '}
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
                </>
            )}
        </article>
    );
}

