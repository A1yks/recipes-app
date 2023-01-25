import ProfileContent from 'src/features/ProfileContent';
import withAuthCheck from 'src/hoc/withAuthCheck';
import PageLayout from 'src/layouts/PageLayout';

function Profile() {
    return (
        <PageLayout title="Profile">
            <ProfileContent />
        </PageLayout>
    );
}

export default withAuthCheck(Profile);
