import { idArrayStringPattern, idSchema } from '@backend/common/schemas';
import Joi from 'joi';
import { AddCategoryToRecipeReq, CreateRecipeReq, EditRecipeReq, GetRecipeReq, GetRecipesReq } from './types';

export const MAX_TITLE_LENGTH = 72;
export const MIN_PREP_TIME = 1;
export const MIN_SERVINGS = 1;

export const recipeTitleFieldSchema = Joi.string().min(3).max(MAX_TITLE_LENGTH);
export const descriptionFieldSchema = Joi.string().min(4).max(600);

export const createRecipeSchema = Joi.object<CreateRecipeReq>().keys({
    title: recipeTitleFieldSchema,
    prepTime: Joi.number()
        .min(MIN_PREP_TIME)
        .max(7 * 24 * 60),
    servings: Joi.number().min(MIN_SERVINGS).max(1000),
    description: descriptionFieldSchema,
    pictureUrl: Joi.string().uri(),
});

export const getRecipeSchema = Joi.object<GetRecipeReq>().keys({
    recipeId: idSchema,
});

export const getRecipesSchema = Joi.object<GetRecipesReq>().keys({
    page: Joi.number().min(1),
    categoryIds: idArrayStringPattern,
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
