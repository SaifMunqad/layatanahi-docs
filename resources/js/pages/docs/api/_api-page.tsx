import DocsPage from '@/pages/docs/_docs-page';

export default function ApiPage({ markdown }: { markdown: string }) {
    return <DocsPage section="Api" title="API Documentation" description="Documentation for the Layatanahi API." markdown={markdown} />;
}
