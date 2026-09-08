import DocsPage from '@/pages/docs/_docs-page';
import markdown from './purchase.md?raw';

export default function UserPurchasePage() {
    return (
        <DocsPage
            section="User"
            title="Purchase"
            description="Purchase tools and order management for users."
            markdown={markdown}
        />
    );
}
