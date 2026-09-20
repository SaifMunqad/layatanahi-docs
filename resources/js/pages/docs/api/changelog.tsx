import ApiPage from '@/pages/docs/api/_api-page';
import markdown from '../../../../docs/en/api/changelog.md?raw';

export default function APIChangelogPage() { return <ApiPage markdown={markdown} />; }
