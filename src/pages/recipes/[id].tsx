import { ParsedUrlQuery } from 'querystring';
import RecipeContent from 'src/features/RecipeContent';
import PageLayout from 'src/layouts/PageLayout';
import getInitialPageProps from 'src/utils/getInitialPageProps';

export type RecipePageQueryParams = ParsedUrlQuery & {
    id: number;
};

function Recipe(props: ReturnType<typeof Recipe['getInitialProps']>) {
    return (
        <PageLayout>
            <RecipeContent recipeId={props.id} />
        </PageLayout>
    );
}

Recipe.getInitialProps = getInitialPageProps((store, ctx) => {
    const { id } = ctx.query as RecipePageQueryParams;

    return { id };
});

export default Recipe;
