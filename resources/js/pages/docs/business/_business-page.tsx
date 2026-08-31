import DocsPage from '@/pages/docs/_docs-page';

type BusinessPageProps = {
    markdown: string;
};

export default function BusinessPage({ markdown }: BusinessPageProps) {
    return <DocsPage markdown={markdown} />;
}
