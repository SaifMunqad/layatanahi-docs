import DocsPage from '@/pages/docs/_docs-page';
import markdown from './profile.md?raw';

export default function UserProfilePage() {
    return (
        <DocsPage
            section="User"
            title="Profile"
            description="Manage user profile information and preferences."
            markdown={markdown}
        />
    );
}
