import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './show.md?raw';

export default function SaleShowPage() { return <BusinessPage markdown={markdown} />; }
