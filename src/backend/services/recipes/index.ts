import Recipe from 'backend/models/Recipe';

namespace RecipesService {
    export async function getRecipe(recipeId: Recipe['id']) {
        return await Recipe.findByPk(recipeId);
    }
}

export default RecipesService;
