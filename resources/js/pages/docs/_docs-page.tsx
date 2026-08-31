import { Head } from '@inertiajs/react';
import { usePublishToc } from '@/components/layout/docs/docs-toc-context';
import { useMarkdown } from '@/lib/markdown';

type DocsPageProps = {
    markdown: string;
    section?: string;
    title?: string;
    description?: string;
};

export default function DocsPage({ markdown, section, description }: DocsPageProps) {
    const { headings, content } = useMarkdown(markdown);

    // Publish the page headings so the layout can build the "on this page" nav.
    usePublishToc(headings);

    const title = headings.find((heading) => heading.depth === 1)?.label ?? 'Documentation';

    return (
        <>
            <Head title={title} />

            {section && (
                <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">{section}</p>
            )}

            {content}

            {description && (
                <p className="sr-only">{description}</p>
            )}
        </>
    );
}
