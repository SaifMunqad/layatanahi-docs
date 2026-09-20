import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './cities.md?raw';

export default function PublicCitiesPage() { return <BusinessPage markdown={markdown} />; }
