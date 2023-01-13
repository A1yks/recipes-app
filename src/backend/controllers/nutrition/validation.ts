import { idSchema } from 'backend/common/schemas';
import Joi from 'joi';
import { CreateNutritionReq, EditNutritionReq, GetNutritionReq } from './types';

const nutritionElementSchema = Joi.number().min(0).max(999999);

const nutritionSchema = Joi.object<CreateNutritionReq['nutrition']>().keys({
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

export const createNutritionSchema = Joi.object<CreateNutritionReq>().keys({
    recipeId: idSchema,
    nutrition: nutritionSchema.required(),
});

export const getNutritionSchema = Joi.object<GetNutritionReq>().keys({
    recipeId: idSchema,
});

export const editNutritionSchema = Joi.object<EditNutritionReq>().keys({
    recipeId: idSchema,
    nutritionId: idSchema,
    nutrition: nutritionSchema.required(),
});
