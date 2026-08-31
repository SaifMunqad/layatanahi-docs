import DocsPage from '@/pages/docs/_docs-page';
import markdown from './idea.md?raw';

export default function IdeaPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Idea"
            description="Idea"
            markdown={markdown}
        />
    );
}
