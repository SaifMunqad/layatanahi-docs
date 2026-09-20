import ApiPage from '@/pages/docs/api/_api-page';
import markdown from './errors.md?raw';

export default function APErrorsPage() { return <ApiPage markdown={markdown} />; }
