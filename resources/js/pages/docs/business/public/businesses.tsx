import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/businesses.md?raw';

export default function PublicBusinessesPage() { return <BusinessPage markdown={markdown} />; }
