import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './reports.md?raw';

export default function StoreReportsPage() { return <BusinessPage markdown={markdown} />; }
