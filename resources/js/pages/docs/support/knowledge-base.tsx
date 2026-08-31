import DocsPage from '@/pages/docs/_docs-page';
import markdown from './knowledge-base.md?raw';

export default function KnowledgeBasePage() {
    return (
        <DocsPage
            section="Support"
            title="Knowledge Base"
            description="Knowledge base articles and reusable answers for common product issues."
            markdown={markdown}
        />
    );
}
