import PageLayout from 'src/layouts/PageLayout';
import getInitialPageProps from 'src/utils/getInitialPageProps';

function Profile() {
    return (
        <PageLayout title="Profile">
            <div>Profile page</div>
        </PageLayout>
    );
}

// Profile.getInitialProps = getInitialPageProps(() => {
//     return {
//         protected: true,
//     };
// });

export default Profile;
