import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/brands.md?raw';

export default function PublicBrandsPage() { return <BusinessPage markdown={markdown} />; }
