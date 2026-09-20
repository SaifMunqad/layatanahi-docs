import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from '../../../../../docs/en/business/store/overview.md?raw';

export default function StoreOverviewPage() {
    return <BusinessPage markdown={markdown} />;
}
