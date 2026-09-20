import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './branches.md?raw';

export default function StoreBranchesPage() { return <BusinessPage markdown={markdown} />; }
