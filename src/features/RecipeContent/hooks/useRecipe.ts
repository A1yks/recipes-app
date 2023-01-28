import { useRouter } from 'next/router';
import { RecipePageQueryParams } from 'src/pages/recipes/[id]';
import { useGetRecipeQuery } from 'src/services/api';
import { RecipeContentProps } from '../RecipeContent.types';

function useRecipe(props: RecipeContentProps) {
    const router = useRouter();
    const { id } = router.query as RecipePageQueryParams;
    const recipeId = props.recipeId || id;
    const { data, isLoading } = useGetRecipeQuery(recipeId);
}

export default useRecipe;
