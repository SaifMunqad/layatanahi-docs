import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './product-variants.md?raw';

export default function PublicProductVariantsPage() { return <BusinessPage markdown={markdown} />; }
