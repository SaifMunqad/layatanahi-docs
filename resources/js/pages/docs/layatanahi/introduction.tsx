import DocsPage from '@/pages/docs/_docs-page';
import markdown from './introduction.md?raw';

export default function IntroductionPage() {
    return (
        <DocsPage
            section="Layatanahi"
            title="Introduction"
            description="Introduction"
            markdown={markdown}
        />
    );
}
