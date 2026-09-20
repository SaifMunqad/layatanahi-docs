import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/layatanahi/overview.md?raw';

export default function LayatanahiOverviewPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Overview"
            description="Layatanahi overview"
            markdown={markdown}
        />
    );
}
