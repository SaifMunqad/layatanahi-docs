import ApiPage from '@/pages/docs/api/_api-page';
import markdown from './guideline.md?raw';

export default function APIGuidelinePage() { return <ApiPage markdown={markdown} />; }
