import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './categories.md?raw';

export default function PublicCategoriesPage() { return <BusinessPage markdown={markdown} />; }
