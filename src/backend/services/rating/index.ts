import Rating, { RatingAttrs } from 'backend/models/Rating';
import { ErrorTypes } from 'backend/types/errors';
import { UniqueConstraintError } from 'sequelize';
import { RatingCreationData } from './types';

namespace RatingService {
    export async function rateRecipe(ratingData: RatingCreationData) {
        try {
            return await Rating.create(ratingData);
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

    export async function editRating(value: Rating['value'], ratingId: Rating['id']) {
        const rating = await getRatingWithErrorsCheck(ratingId);

        return await rating.update({ value });
    }

    export async function deleteRating(ratingId: Rating['id']) {
        const rating = await getRatingWithErrorsCheck(ratingId);

        await rating.destroy();
    }

    async function getRatingWithErrorsCheck(ratingId: Rating['id']) {
        const rating = await getRating({ id: ratingId });

        if (rating === null) {
            throw new Error('Rating with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return rating;
    }
}

export default RatingService;
