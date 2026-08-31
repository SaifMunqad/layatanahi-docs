import DocsPage from '@/pages/docs/_docs-page';
import markdown from './features.md?raw';

export default function FeaturesPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Features"
            description="Features"
            markdown={markdown}
        />
    );
}
