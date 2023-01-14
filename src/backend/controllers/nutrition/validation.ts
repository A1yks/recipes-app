import { idSchema } from 'backend/common/schemas';
import Joi from 'joi';
import { CreateNutritionReq, EditNutritionReq, GetNutritionReq } from './types';

const nutritionElementSchema = Joi.number().min(0).max(999999);

const nutritionSchemaObj: Joi.PartialSchemaMap<CreateNutritionReq['nutrition']> = {
    calories: nutritionElementSchema,
    cholesterol: nutritionElementSchema,
    potassium: nutritionElementSchema,
    protein: nutritionElementSchema,
    saturatedFat: nutritionElementSchema,
    sodium: nutritionElementSchema,
    sugars: nutritionElementSchema,
    totalCarbohydrate: nutritionElementSchema,
    totalFat: nutritionElementSchema,
};

function buildNutritionSchema(caloriesRequired = false) {
    if (caloriesRequired) {
        return Joi.object<CreateNutritionReq['nutrition']>().keys({
            ...nutritionSchemaObj,
            calories: nutritionElementSchema.required(),
        });
    }

    return Joi.object<CreateNutritionReq['nutrition']>().keys(nutritionSchemaObj);
}

export const createNutritionSchema = Joi.object<CreateNutritionReq>().keys({
    recipeId: idSchema,
    nutrition: buildNutritionSchema(true).required(),
});

export const getNutritionSchema = Joi.object<GetNutritionReq>().keys({
    recipeId: idSchema,
});

export const editNutritionSchema = Joi.object<EditNutritionReq>().keys({
    recipeId: idSchema,
    nutritionId: idSchema,
    nutrition: buildNutritionSchema().required(),
});
