import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './listing.md?raw';

export default function InventoryListingPage() { return <BusinessPage markdown={markdown} />; }
