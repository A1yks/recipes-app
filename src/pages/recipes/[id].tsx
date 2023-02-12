import { ParsedUrlQuery } from 'querystring';
import RecipeContent from 'src/features/RecipeContent';
import PageLayout from 'src/layouts/PageLayout';
import { getRecipe, getRunningQueriesThunk } from 'src/services/api';
import { useAppSelector } from 'src/store/hooks';
import getInitialPageProps from 'src/utils/getInitialPageProps';

export type RecipePageQueryParams = ParsedUrlQuery & {
    id: number;
};

function Recipe() {
    const title = useAppSelector((state) => state.recipes.openedRecipeData.recipe?.title);

    return (
        <PageLayout title={title}>
            <RecipeContent />
        </PageLayout>
    );
}

Recipe.getInitialProps = getInitialPageProps(async (store, ctx) => {
    const { id } = ctx.query as RecipePageQueryParams;

    store.dispatch(getRecipe.initiate(id));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
});

export default Recipe;
