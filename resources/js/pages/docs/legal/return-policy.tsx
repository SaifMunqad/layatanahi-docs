import DocsPage from '@/pages/docs/_docs-page';
import markdown from './return-policy.md?raw';

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
