import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './listing.md?raw';

export default function PublicListingPage() { return <BusinessPage markdown={markdown} />; }
