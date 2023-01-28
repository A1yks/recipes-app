import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useGetUserRecipesQuery } from 'src/services/api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setRecipePreviews } from 'src/store/reducers/userRecipes';
import { extractError } from 'src/utils/extractError';

type QueryParams = {
    page?: string;
};

const RECIPES_PER_PAGE = 12;

function useUserRecipesPagination() {
    const router = useRouter();
    const query = router.query as QueryParams;
    const initialPage = query.page !== undefined ? +query.page : 1;
    const [page, setPage] = useState(initialPage);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { recipePreviews: recipes, amount } = useAppSelector((state) => state.userRecipes);
    const { data: recipePreviewsData, isLoading, isError, error } = useGetUserRecipesQuery(page);
    const showLoader = isLoading && recipes.length === 0;
    const showPagination = amount > RECIPES_PER_PAGE;
    const totalPages = Math.ceil(amount / RECIPES_PER_PAGE);

    const changePageHandler = (e: React.ChangeEvent<unknown>, page: number) => setPage(page);

    useEffect(() => {
        if (isError) {
            enqueueSnackbar(extractError(error), { variant: 'error' });
        }
    }, [enqueueSnackbar, error, isError]);

    useEffect(() => {
        if (recipePreviewsData !== undefined) {
            dispatch(setRecipePreviews(recipePreviewsData.data));
        }
    }, [recipePreviewsData, dispatch]);

    return { recipes, page, totalPages, showLoader, showPagination, changePageHandler };
}

export default useUserRecipesPagination;
