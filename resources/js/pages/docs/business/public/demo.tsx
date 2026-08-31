import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './demo.md?raw';

export default function PublicDemoPage() { return <BusinessPage markdown={markdown} />; }
