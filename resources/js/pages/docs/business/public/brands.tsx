import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './brands.md?raw';

export default function PublicBrandsPage() { return <BusinessPage markdown={markdown} />; }
