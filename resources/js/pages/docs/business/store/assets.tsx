import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './assets.md?raw';

export default function StoreAssetsPage() { return <BusinessPage markdown={markdown} />; }
