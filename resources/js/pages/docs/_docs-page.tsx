import { Head } from '@inertiajs/react';

type DocsPageProps = {
    section: string;
    title: string;
    description: string;
};

export default function DocsPage({ section, title, description }: DocsPageProps) {
    const highlights = [
        'Clear overview for your team and customers',
        'Ready-made demo flows for decision-makers',
        'Fast navigation across the product area',
    ];

    return (
        <>
            <Head title={title} />

            <div className="space-y-8">
                <div>
                    <p className="text-sm font-medium text-red-600">{section}</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        {description}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {highlights.map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
                        >
                            <div className="mb-2 h-2.5 w-2.5 rounded-full bg-red-500" />
                            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">What this page covers</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        <li>• Product context and the action users take in this flow.</li>
                        <li>• The key screens and decision points in the experience.</li>
                        <li>• A demo-ready overview suitable for product walkthroughs.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
