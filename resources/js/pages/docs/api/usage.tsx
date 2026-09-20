import ApiPage from '@/pages/docs/api/_api-page';
import markdown from '../../../../docs/en/api/usage.md?raw';

export default function APIUsagePage() { return <ApiPage markdown={markdown} />; }
