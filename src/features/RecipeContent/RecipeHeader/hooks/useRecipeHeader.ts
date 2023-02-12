import { EditRecipeReq } from '@backend/controllers/recipes/types';
import useRecipe from 'src/hooks/useRecipe';
import { useEditRecipeMutation } from 'src/services/api';
import { useAppSelector } from 'src/store/hooks';
import useErrorsHandler from 'src/utils/errorsHandler';

function useRecipeHeader() {
    const recipe = useRecipe();
    const userRating = useAppSelector((state) => state.recipes.openedRecipeData.userRating);
    const userId = useAppSelector((state) => state.auth.user?.id);
    const [editRecipeMutation, { isLoading: isSaving }] = useEditRecipeMutation();
    const isUserLoggedIn = userId !== undefined;
    const userIsAuthor = isUserLoggedIn && recipe.authorId === userId;
    const canUserModifyRating = isUserLoggedIn && !userIsAuthor && userRating === undefined;
    const hasDescription = recipe.description !== null;
    const creationDate = new Date(recipe.createdAt);
    const formattedDate = new Intl.DateTimeFormat(['ru', 'en-US']).format(creationDate);

    const editRecipe = useErrorsHandler(async (newData: Omit<EditRecipeReq, 'recipeId'>) => {
        await editRecipeMutation({ ...newData, recipeId: recipe.id }).unwrap();
    });

    const saveTitleHandler = (title: string) => editRecipe({ title });

    const saveDescriptionHandler = (description: string) => editRecipe({ description });

    return {
        recipe,
        canUserModifyRating,
        isUserLoggedIn,
        userIsAuthor,
        hasDescription,
        formattedDate,
        isSaving,
        saveTitleHandler,
        saveDescriptionHandler,
    };
}

export default useRecipeHeader;
