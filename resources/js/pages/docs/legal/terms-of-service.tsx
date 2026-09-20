import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/legal/terms-of-service.md?raw';

export default function TermsOfServicePage() {
    return (
        <DocsPage
            section="Legal"
            title="Terms of Service"
            description="Terms of Service"
            markdown={markdown}
        />
    );
}
