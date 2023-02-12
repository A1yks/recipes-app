import { useAppSelector } from 'src/store/hooks';

function useRecipe() {
    const recipe = useAppSelector((state) => state.recipes.openedRecipeData.recipe);

    if (recipe === null) {
        throw new Error('useRecipe hook must be used only when recipe is available in the store');
    }

    return recipe;
}

export default useRecipe;
