import { RatingAttrs } from '@backend/models/Rating';

export type RateRecipeReq = Omit<RatingAttrs, 'id' | 'userId'>;

export type EditRatingReq = RateRecipeReq;

export type DeleteRatingReq = Pick<RateRecipeReq, 'recipeId'>;
