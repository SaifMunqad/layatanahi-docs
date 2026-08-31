import DocsPage from '@/pages/docs/_docs-page';
import markdown from './contact-team.md?raw';

export default function ContactTeamPage() {
    return (
        <DocsPage
            section="Support"
            title="Contact Team"
            description="Support contacts and escalation flows for direct human help when needed."
            markdown={markdown}
        />
    );
}
