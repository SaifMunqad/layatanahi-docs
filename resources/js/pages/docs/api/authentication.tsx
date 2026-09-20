import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/api/authentication.md?raw';

export default function AuthenticationPage() {
    return (
        <DocsPage
            section="Api"
            title="Authentication"
            description="Authentication patterns and secure token handling for API access."
            markdown={markdown}
        />
    );
}
