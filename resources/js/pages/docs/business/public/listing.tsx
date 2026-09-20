import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/listing.md?raw';

export default function PublicListingPage() { return <BusinessPage markdown={markdown} />; }
