import { MAX_TITLE_LENGTH, MIN_PREP_TIME, MIN_SERVINGS } from 'backend/models/Recipe';
import Joi from 'joi';
import { CreateRecipeReq, EditRecipeReq, GetRecipeReq, GetRecipesReq } from './types';

const nutritionElementSchema = Joi.number().min(0).max(999999);

const nutritionSchema = Joi.object<CreateRecipeReq['nutrition']>().keys({
    calories: nutritionElementSchema.required(),
    cholesterol: nutritionElementSchema,
    potassium: nutritionElementSchema,
    protein: nutritionElementSchema,
    saturatedFat: nutritionElementSchema,
    sodium: nutritionElementSchema,
    sugars: nutritionElementSchema,
    totalCarbohydrate: nutritionElementSchema,
    totalFat: nutritionElementSchema,
});

const editRecipeObj: Joi.PartialSchemaMap<EditRecipeReq> = {
    title: Joi.string().min(3).max(MAX_TITLE_LENGTH),
    prepTime: Joi.number()
        .min(MIN_PREP_TIME)
        .max(7 * 24 * 60),
    servings: Joi.number().min(MIN_SERVINGS).max(1000),
    description: Joi.string().min(4),
    pictureUrl: Joi.string().uri(),
    categories: Joi.array().items(Joi.number()).min(1),
    instructions: Joi.array().items(Joi.string().min(6).max(1000)).min(1),
    nutrition: nutritionSchema,
};

export const editRecipeSchema = Joi.object<EditRecipeReq>().keys(editRecipeObj);

export const getRecipeSchema = Joi.object<GetRecipeReq>().keys({
    recipeId: Joi.number().required(),
});

export const getRecipesSchema = Joi.object<GetRecipesReq>().keys({
    limit: Joi.number().min(1),
    offset: Joi.number().min(0),
});

export const deleteRecipeSchema = getRecipeSchema;

export const createRecipeSchema = editRecipeSchema
    .append<CreateRecipeReq>({
        authorId: Joi.number().min(1),
    })
    .fork(Object.keys(editRecipeObj), (schema) => schema.required());
