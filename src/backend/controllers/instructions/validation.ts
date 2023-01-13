import Joi from 'joi';
import { idSchema } from 'backend/common/schemas';
import { CreateInstructionReq, DeleteInstructionReq, EditInstructionReq, GetInstructionsReq } from './types';

const instructionTextSchema = Joi.string().min(6).max(1000);

export const createInstructionSchema = Joi.object<CreateInstructionReq>().keys({
    recipeId: idSchema,
    stepNumber: Joi.number().min(1).required(),
    instructionText: instructionTextSchema.required(),
});

export const getInstructionsSchema = Joi.object<GetInstructionsReq>().keys({
    recipeId: idSchema,
});

export const editInstructionSchema = Joi.object<EditInstructionReq>()
    .keys({
        recipeId: idSchema,
        instructionId: idSchema,
        instructionText: instructionTextSchema,
        stepNumber: Joi.number().min(1),
    })
    .or('instructionText', 'stepNumber');

export const deleteInstructionSchema = Joi.object<DeleteInstructionReq>().keys({
    recipeId: idSchema,
    insturctionId: idSchema,
});
