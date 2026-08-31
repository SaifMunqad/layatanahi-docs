import DocsPage from '@/pages/docs/_docs-page';
import markdown from './credits.md?raw';

export default function CreditsPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Credits"
            description="Credits"
            markdown={markdown}
        />
    );
}
