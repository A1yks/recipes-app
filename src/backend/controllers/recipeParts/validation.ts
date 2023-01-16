import Joi from 'joi';
import { idSchema } from 'backend/common/schemas';
import { MAX_PART_NAME_LENGTH } from 'backend/models/RecipePart';
import { CreateRecipePartReq, DeleteRecipePartReq, EditRecipePartNameReq, GetRecipePartsReq } from './types';

const partNameSchema = Joi.string().min(3).max(MAX_PART_NAME_LENGTH).required();

export const createRecipePartSchema = Joi.object<CreateRecipePartReq>().keys({
    partName: partNameSchema,
    recipeId: idSchema,
});

export const getRecipePartsSchema = Joi.object<GetRecipePartsReq>().keys({
    recipeId: idSchema,
});

export const editRecipePartNameSchema = Joi.object<EditRecipePartNameReq>().keys({
    partName: partNameSchema,
    recipeId: idSchema,
    recipePartId: idSchema,
});

export const deleteRecipePartSchema = Joi.object<DeleteRecipePartReq>().keys({
    recipeId: idSchema,
    recipePartId: idSchema,
});
