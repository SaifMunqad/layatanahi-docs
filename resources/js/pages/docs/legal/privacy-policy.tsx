import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/legal/privacy-policy.md?raw';

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
