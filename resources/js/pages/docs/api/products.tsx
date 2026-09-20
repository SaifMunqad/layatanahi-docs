import ApiPage from '@/pages/docs/api/_api-page';
import markdown from './products.md?raw';

export default function APIProductsPage() { return <ApiPage markdown={markdown} />; }
