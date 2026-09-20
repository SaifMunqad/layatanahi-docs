import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/categories.md?raw';

export default function PublicCategoriesPage() { return <BusinessPage markdown={markdown} />; }
