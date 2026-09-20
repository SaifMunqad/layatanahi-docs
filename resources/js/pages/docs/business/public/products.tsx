import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './products.md?raw';

export default function PublicProductsPage() { return <BusinessPage markdown={markdown} />; }
