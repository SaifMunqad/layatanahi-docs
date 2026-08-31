import DocsPage from '@/pages/docs/_docs-page';
import markdown from './help-center.md?raw';

export default function HelpCenterPage() {
    return (
        <DocsPage
            section="Support"
            title="Help Center"
            description="Support hub with guidance, troubleshooting, and onboarding for new users."
            markdown={markdown}
        />
    );
}
