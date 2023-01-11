import Recipe from 'backend/models/Recipe';
import { CreateRecipeData, EditRecipeData } from './types';

namespace RecipesService {
    export async function createRecipe(recipeData: CreateRecipeData) {
        return await Recipe.create(recipeData);
    }

    export async function getRecipe(recipeId: Recipe['id']) {
        return await Recipe.findByPk(recipeId);
    }

    export async function getRecipes(limit: number, offset: number) {}

    export async function deleteRecipe(recipeId: Recipe['id']) {
        const deletedRows = await Recipe.destroy({ where: { id: recipeId } });

        return deletedRows > 0;
    }

    export async function editRecipe(recipeData: EditRecipeData) {
        const recipe = await Recipe.findByPk(recipeData.recipeId);

        if (recipe === null) {
            return null;
        }
    }
}

export default RecipesService;
