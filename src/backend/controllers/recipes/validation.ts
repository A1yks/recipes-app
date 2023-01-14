import { idSchema } from 'backend/common/schemas';
import { MAX_TITLE_LENGTH, MIN_PREP_TIME, MIN_SERVINGS } from 'backend/models/Recipe';
import Joi from 'joi';
import { AddCategoryToRecipeReq, CreateRecipeReq, EditRecipeReq, GetRecipeReq, GetRecipesReq } from './types';

export const createRecipeSchema = Joi.object<CreateRecipeReq>().keys({
    title: Joi.string().min(3).max(MAX_TITLE_LENGTH),
    prepTime: Joi.number()
        .min(MIN_PREP_TIME)
        .max(7 * 24 * 60),
    servings: Joi.number().min(MIN_SERVINGS).max(1000),
    description: Joi.string().min(4),
    pictureUrl: Joi.string().uri(),
});

export const getRecipeSchema = Joi.object<GetRecipeReq>().keys({
    recipeId: idSchema,
});

export const getRecipesSchema = Joi.object<GetRecipesReq>().keys({
    limit: Joi.number().min(1),
    offset: Joi.number().min(0),
});

export const deleteRecipeSchema = getRecipeSchema;

export const editRecipeSchema = createRecipeSchema.append<EditRecipeReq>({
    recipeId: idSchema,
});

export const addCategoryToRecipeSchema = Joi.object<AddCategoryToRecipeReq>().keys({
    categoryId: idSchema,
    recipeId: idSchema,
});

export const deleteCategoryFromRecipeSchema = addCategoryToRecipeSchema;
