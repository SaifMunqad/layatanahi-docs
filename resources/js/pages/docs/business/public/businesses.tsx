import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './businesses.md?raw';

export default function PublicBusinessesPage() { return <BusinessPage markdown={markdown} />; }
