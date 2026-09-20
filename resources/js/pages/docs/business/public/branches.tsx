import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/public/branches.md?raw';

export default function PublicBranchesPage() { return <BusinessPage markdown={markdown} />; }
