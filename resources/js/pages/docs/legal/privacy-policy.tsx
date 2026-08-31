import DocsPage from '@/pages/docs/_docs-page';
import markdown from './privacy-policy.md?raw';

export default function PrivacyPolicyPage() {
    return (
        <DocsPage
            section="Legal"
            title="Privacy Policy"
            description="Privacy Policy"
            markdown={markdown}
        />
    );
}
