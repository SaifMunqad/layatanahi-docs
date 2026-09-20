import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './activities.md?raw';

export default function StoreActivitiesPage() { return <BusinessPage markdown={markdown} />; }
