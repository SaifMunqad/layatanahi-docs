import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './transfers.md?raw';

export default function InventoryTransfersPage() { return <BusinessPage markdown={markdown} />; }
