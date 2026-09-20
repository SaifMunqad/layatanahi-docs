import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/user/ai.md?raw';

export default function UserAiPage() {
    return (
        <DocsPage
            section="User"
            title="AI"
            description="AI-powered tools and assistance for users."
            markdown={markdown}
        />
    );
}
