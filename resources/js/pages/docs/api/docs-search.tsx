import ApiPage from '@/pages/docs/api/_api-page';
import markdown from '../../../../docs/en/api/docs-search.md?raw';

export default function APIDocsSearchPage() {
    return <ApiPage markdown={markdown} />;
}
