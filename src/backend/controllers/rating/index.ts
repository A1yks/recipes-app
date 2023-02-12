import RatingService from '@backend/services/rating';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import { DeleteRatingReq, EditRatingReq, RateRecipeReq } from './types';

namespace RatingController {
    export async function rateRecipe(req: Server.Request<RateRecipeReq>, res: Server.Response) {
        try {
            const results = await RatingService.rateRecipe({ ...req.body, userId: req.userId! });

            res.status(201).json({ data: results });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured when rating the recipe',
                expectedErrors: [
                    [ErrorTypes.ALREADY_EXISTS, 409],
                    [ErrorTypes.NOT_FOUND, 404],
                ],
            });
        }
    }

    export async function editRating(req: Server.Request<EditRatingReq>, res: Server.Response) {
        const { recipeId, value } = req.body;

        try {
            const results = await RatingService.editRating(value, recipeId, req.userId!);

            res.status(200).json({ data: results });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: "An unexpected error occured while editing recipe's rating",
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteRating(req: Server.Request<DeleteRatingReq>, res: Server.Response) {
        const { recipeId } = req.body;

        try {
            const results = await RatingService.deleteRating(recipeId, req.userId!);

            res.status(200).json({ data: results });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: "An unexpected error occured while deleting recipe's rating",
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default RatingController;
