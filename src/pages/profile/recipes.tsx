import UserRecipes from 'src/features/UserRecipes';
import withAuthCheck from 'src/hoc/withAuthCheck';
import PageLayout from 'src/layouts/PageLayout';

function Recipes() {
    return (
        <PageLayout title="My recipes">
            <UserRecipes />
        </PageLayout>
    );
}

export default withAuthCheck(Recipes);
