import DocsPage from '@/pages/docs/_docs-page';
import markdown from './reference.md?raw';

export default function APIReferencePage() {
    return (
        <DocsPage
            section="Api"
            title="API Reference"
            description="Reference information for endpoints, payloads, and integration examples."
            markdown={markdown}
        />
    );
}
