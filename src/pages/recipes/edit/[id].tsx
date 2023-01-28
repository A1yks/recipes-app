import EditRecipeContent from 'src/features/EditRecipeContent';
import withAuthCheck from 'src/hoc/withAuthCheck';
import PageLayout from 'src/layouts/PageLayout';

function EditRecipe() {
    return (
        <PageLayout>
            <EditRecipeContent />
        </PageLayout>
    );
}

export default withAuthCheck(EditRecipe);
