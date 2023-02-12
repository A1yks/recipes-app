import PageLoader from 'src/components/PageLoader';
import ContentLayout from 'src/layouts/ContentLayout';
import useRecipeContent from './hooks/useRecipeContent';
import RecipeGallery from './RecipeGallery';
import RecipeHeader from './RecipeHeader';

function RecipeContent() {
    const { isLoading } = useRecipeContent();

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <ContentLayout>
            <RecipeHeader />
            <RecipeGallery sx={{ mt: 3 }} />
        </ContentLayout>
    );
}

export default RecipeContent;
