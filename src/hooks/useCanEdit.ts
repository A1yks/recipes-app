import { useAppSelector } from 'src/store/hooks';

function useCanEdit() {
    const openedRecipe = useAppSelector((state) => state.recipes.openedRecipeData.recipe);
    const userId = useAppSelector((state) => state.auth.user?.id);
    const canEdit = openedRecipe?.authorId !== undefined && userId !== undefined && openedRecipe.authorId === userId;

    return canEdit;
}

export default useCanEdit;
