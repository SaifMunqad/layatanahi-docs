import DocsPage from '@/pages/docs/_docs-page';
import markdown from './overview.md?raw';

export default function UserOverviewPage() {
    return (
        <DocsPage
            section="User"
            title="Overview"
            description="User overview for managing activity and service status."
            markdown={markdown}
        />
    );
}
