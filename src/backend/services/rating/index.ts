import Rating, { RatingAttrs } from '@backend/models/Rating';
import { RecipeAttrs } from '@backend/models/Recipe';
import { UserAttrs } from '@backend/models/User';
import { ErrorTypes } from '@backend/types/errors';
import { UniqueConstraintError } from 'sequelize';
import RecipesService from '../recipes';
import { RatingCreationData } from './types';

namespace RatingService {
    export async function rateRecipe(ratingData: RatingCreationData) {
        try {
            const userRating = await Rating.create(ratingData);
            const recipeRating = await RecipesService.getRecipeRating(ratingData.recipeId);

            return { userRating: userRating.value, recipeRating };
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                throw new Error('You have already rated this recipe', { cause: ErrorTypes.ALREADY_EXISTS });
            }

            throw err;
        }
    }

    export async function getRating(ratingData: Partial<RatingAttrs>) {
        return await Rating.findOne({ where: ratingData });
    }

    export async function editRating(value: Rating['value'], recipeId: RecipeAttrs['id'], userId: UserAttrs['id']) {
        const rating = await getRatingWithErrorsCheck({ recipeId, userId });
        const updatedRating = await rating.update({ value });
        const recipeRating = await RecipesService.getRecipeRating(rating.recipeId);

        return { userRating: updatedRating.value, recipeRating: recipeRating };
    }

    export async function deleteRating(recipeId: RecipeAttrs['id'], userId: UserAttrs['id']) {
        const rating = await getRatingWithErrorsCheck({ recipeId, userId });

        await rating.destroy();

        const recipeRating = await RecipesService.getRecipeRating(recipeId);

        return { userRating: null, recipeRating };
    }

    async function getRatingWithErrorsCheck(ratingData: Partial<RatingAttrs>) {
        const rating = await getRating(ratingData);

        if (rating === null) {
            throw new Error('Rating with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return rating;
    }
}

export default RatingService;
