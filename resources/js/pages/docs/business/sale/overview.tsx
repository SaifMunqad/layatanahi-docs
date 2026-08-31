import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './overview.md?raw';

export default function SaleOverviewPage() { return <BusinessPage markdown={markdown} />; }
