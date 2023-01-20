import { RatingAttrs } from '@backend/models/Rating';

export type RateRecipeReq = Omit<RatingAttrs, 'id' | 'userId'>;

export type EditRatingReq = {
    ratingId: RatingAttrs['id'];
    value: RatingAttrs['value'];
};

export type DeleteRatingReq = {
    ratingId: RatingAttrs['id'];
};
