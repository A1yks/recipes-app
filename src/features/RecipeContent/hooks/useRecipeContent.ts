import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { RecipePageQueryParams } from 'src/pages/recipes/[id]';
import { useGetRecipeQuery } from 'src/services/api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setOpenedRecipeData } from 'src/store/reducers/recipes';
import { extractError } from 'src/utils/extractError';

function useRecipeContent() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id: recipeId } = router.query as RecipePageQueryParams;
    const { data: recipeData, isLoading, isError, error } = useGetRecipeQuery(recipeId);
    const recipe = useAppSelector((state) => state.recipes.openedRecipeData);

    useEffect(() => {
        if (isError) {
            enqueueSnackbar(extractError(error), { variant: 'error' });
        }
    }, [enqueueSnackbar, error, isError]);

    useEffect(() => {
        if (recipeData !== undefined) {
            dispatch(setOpenedRecipeData(recipeData.data));
        }
    }, [recipeData, dispatch]);

    return { recipe, isLoading, isError };
}

export default useRecipeContent;
