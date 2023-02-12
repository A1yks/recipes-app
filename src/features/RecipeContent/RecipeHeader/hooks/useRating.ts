import { useSnackbar } from 'notistack';
import useRecipe from 'src/hooks/useRecipe';
import { useDeleteRatingMutation, useEditRatingMutation, useRateRecipeMutation } from 'src/services/api';
import useErrorsHandler from 'src/utils/errorsHandler';

export const ratingPrecision = 0.5;

function useRating() {
    const { id: recipeId } = useRecipe();

    if (recipeId === undefined) {
        throw new Error('RecipeHeader component must be used only when recipe is available in the store');
    }

    const { enqueueSnackbar } = useSnackbar();
    const [rateRecipeMutation, { isLoading: isRatingRecipe }] = useRateRecipeMutation();
    const [editRatingMutation, { isLoading: isEditingRating }] = useEditRatingMutation();
    const [deleteRatingMutation, { isLoading: isDeletingRating }] = useDeleteRatingMutation();

    const showSuccessInfo = () => enqueueSnackbar('Your rating has been saved', { variant: 'success' });

    function ratingHelper(callback: (value: number) => MaybePromise<void>) {
        return async (_: any, value: number | null) => {
            if (value !== null) {
                await callback(value / ratingPrecision);
            }
        };
    }

    const rateRecipe = useErrorsHandler(async (value: number) => {
        await rateRecipeMutation({ recipeId, value }).unwrap();
        showSuccessInfo();
    });

    const editRating = useErrorsHandler(async (value: number) => {
        await editRatingMutation({ recipeId, value }).unwrap();
        showSuccessInfo();
    });

    const deleteRating = useErrorsHandler(async () => {
        await deleteRatingMutation({ recipeId }).unwrap();
        enqueueSnackbar('You rating has been deleted', { variant: 'success' });
    });

    const rateRecipeHandler = ratingHelper(rateRecipe);
    const editRatingHandler = ratingHelper(editRating);
    const deleteRatingHandler = ratingHelper(deleteRating);

    return {
        isRatingRecipe,
        isEditingRating,
        isDeletingRating,
        rateRecipeHandler,
        editRatingHandler,
        deleteRatingHandler,
    };
}

export default useRating;
