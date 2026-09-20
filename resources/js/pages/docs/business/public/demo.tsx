import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/demo.md?raw';

export default function PublicDemoPage() { return <BusinessPage markdown={markdown} />; }
