import { UserAttrs } from 'backend/models/User';
import RecipesService from 'backend/services/recipes';
import { ErrorCause } from 'backend/types/errors';
import { DeleteRecipeReq, EditRecipeReq } from './types';

export async function checkUserPermissionsForOperationsWithRecipe(
    userId: UserAttrs['id'],
    req: Server.Request<DeleteRecipeReq | EditRecipeReq>
) {
    const { recipeId } = req.body;
    const recipe = await RecipesService.getRecipe(recipeId);

    if (recipe === null) {
        throw new Error('Recipe with given id does not exist', { cause: ErrorCause.PERMISSIONS_CALLBACK });
    }

    return recipe.authorId === userId;
}
