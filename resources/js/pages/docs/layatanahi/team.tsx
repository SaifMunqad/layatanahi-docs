import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/layatanahi/team.md?raw';

export default function TeamPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Team"
            description="Team"
            markdown={markdown}
        />
    );
}
