import DocsPage from '@/pages/docs/_docs-page';
import markdown from './account-center.md?raw';

export default function AccountCenterPage() {
    return (
        <DocsPage
            section="Customer"
            title="Account Center"
            description="Account center for profile settings, billing controls, and personalized service preferences."
            markdown={markdown}
        />
    );
}
