import { idSchema } from '@backend/common/schemas';
import { IngridientUnits, MAX_INGRIDIENT_TEXT_LENGTH } from '@backend/models/Ingridient';
import { IngridientEditingData } from '@backend/services/ingridients/types';
import Joi from 'joi';
import { CreateIngridientReq, DeleteIngridientReq, EditIngridientReq, GetIngridientsReq } from './types';

const ingridientSchemaObj = {
    amount: Joi.number().min(0),
    text: Joi.string().min(3).max(MAX_INGRIDIENT_TEXT_LENGTH),
    unit: Joi.string().valid(...Object.values(IngridientUnits)),
} satisfies Joi.PartialSchemaMap<IngridientEditingData>;

function buildIngridientSchema(fieldsRequired = false) {
    const schema = Joi.object<IngridientEditingData>(ingridientSchemaObj);

    if (fieldsRequired) {
        return schema.fork(Object.keys(ingridientSchemaObj), (key) => key.required());
    }

    return schema;
}

export const createIngridientSchema = Joi.object<CreateIngridientReq>().keys({
    recipeId: idSchema,
    recipePartId: idSchema,
    ingridientData: buildIngridientSchema(true).required(),
});

export const getIngridientsSchema = Joi.object<GetIngridientsReq>().keys({
    recipeId: idSchema,
});

export const deleteIngridientSchema = Joi.object<DeleteIngridientReq>().keys({
    recipeId: idSchema,
    recipePartId: idSchema,
    ingridientId: idSchema,
});

export const editIngridientSchema = deleteIngridientSchema.append<EditIngridientReq>({
    ingridientData: buildIngridientSchema().or('amount', 'unit', 'text').required(),
});
