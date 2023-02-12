import { UserAttrs } from '@backend/models/User';
import RatingService from '@backend/services/rating';
import RecipesService from '@backend/services/recipes';
import { ErrorTypes } from '@backend/types/errors';
import { DeleteRatingReq, EditRatingReq, RateRecipeReq } from './types';

export async function checkUserPermissionsForOperationsWithRating(
    req: Server.Request<EditRatingReq | DeleteRatingReq>,
    userId: UserAttrs['id']
) {
    const { recipeId } = req.body;
    const rating = await RatingService.getRating({ recipeId, userId });

    return rating !== null;
}

export async function checkUserPermissionsForRatingRecipe(req: Server.Request<RateRecipeReq>, userId: UserAttrs['id']) {
    const { recipeId } = req.body;
    const recipe = await RecipesService.getRecipe({ id: recipeId });

    if (recipe?.authorId === userId) {
        throw new Error('You cannot rate your own recipe', { cause: ErrorTypes.NO_PERMISSIONS });
    }

    return true;
}
