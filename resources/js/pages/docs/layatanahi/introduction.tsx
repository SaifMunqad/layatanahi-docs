import DocsPage from '@/pages/docs/_docs-page';
import markdown from '../../../../docs/en/layatanahi/introduction.md?raw';

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
