import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/legal/return-policy.md?raw';

export default function ReturnPolicyPage() {
    return (
        <DocsPage
            section="Legal"
            title="Return Policy"
            description="Return Policy"
            markdown={markdown}
        />
    );
}
