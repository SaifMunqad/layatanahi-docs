import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/overview.md?raw';

export default function PublicOverviewPage() { return <BusinessPage markdown={markdown} />; }
