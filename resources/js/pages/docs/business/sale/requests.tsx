import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './requests.md?raw';

export default function SaleRequestsPage() { return <BusinessPage markdown={markdown} />; }
