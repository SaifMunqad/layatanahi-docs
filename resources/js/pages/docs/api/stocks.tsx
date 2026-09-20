import ApiPage from '@/pages/docs/api/_api-page';
import markdown from './stocks.md?raw';

export default function APIStocksPage() { return <ApiPage markdown={markdown} />; }
