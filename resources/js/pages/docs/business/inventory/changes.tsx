import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './changes.md?raw';

export default function InventoryChangesPage() { return <BusinessPage markdown={markdown} />; }
