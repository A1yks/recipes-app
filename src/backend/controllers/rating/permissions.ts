import { UserAttrs } from 'backend/models/User';
import RatingService from 'backend/services/rating';
import { DeleteRatingReq, EditRatingReq } from './types';

export async function checkUserPermissionsForOperationsWithRating(
    req: Server.Request<EditRatingReq | DeleteRatingReq>,
    userId: UserAttrs['id']
) {
    const { ratingId } = req.body;
    const rating = await RatingService.getRating({ id: ratingId, userId });

    return rating !== null;
}
