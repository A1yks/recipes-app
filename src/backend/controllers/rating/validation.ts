import { idSchema } from '@backend/common/schemas';
import { MAX_RATING_VALUE, MIN_RATING_VALUE } from '@backend/models/Rating';
import Joi from 'joi';
import { DeleteRatingReq, RateRecipeReq } from './types';

const valueSchema = Joi.number().min(MIN_RATING_VALUE).max(MAX_RATING_VALUE).required();

export const rateRecipeSchema = Joi.object<RateRecipeReq>().keys({
    recipeId: idSchema,
    value: valueSchema,
});

export const deleteRatingSchema = Joi.object<DeleteRatingReq>().keys({
    recipeId: idSchema,
});

export const editRatingSchema = rateRecipeSchema;
