import DocsPage from '@/pages/docs/_docs-page';
import markdown from './overview.md?raw';

export default function APIOverviewPage() {
    return (
        <DocsPage
            section="Api"
            title="API Overview"
            description="Overview of the API capabilities and service integrations available to clients."
            markdown={markdown}
        />
    );
}
