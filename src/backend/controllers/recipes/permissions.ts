import { UserAttrs } from '@backend/models/User';
import RecipesService from '@backend/services/recipes';
import { ErrorTypes } from '@backend/types/errors';
import { DeleteRecipeReq, EditRecipeReq } from './types';

export async function checkUserPermissionsForOperationsWithRecipe(
    req: Server.Request<DeleteRecipeReq | EditRecipeReq>,
    userId: UserAttrs['id']
) {
    const { recipeId } = req.body;
    const recipe = await RecipesService.getRecipe({ id: recipeId });

    if (recipe === null) {
        throw new Error('Recipe with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
    }

    return recipe.authorId === userId;
}
