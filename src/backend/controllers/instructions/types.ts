import { InstructionAttrs } from '@backend/models/Instruction';
import { RecipeAttrs } from '@backend/models/Recipe';

export type CreateInstructionReq = {
    recipeId: RecipeAttrs['id'];
    instructionText: InstructionAttrs['text'];
    stepNumber: InstructionAttrs['stepNumber'];
};

export type GetInstructionsReq = {
    recipeId: RecipeAttrs['id'];
};

export type EditInstructionReq = {
    recipeId: RecipeAttrs['id'];
    instructionId: InstructionAttrs['id'];
    text?: InstructionAttrs['text'];
    stepNumber?: InstructionAttrs['stepNumber'];
};

export type DeleteInstructionReq = {
    recipeId: RecipeAttrs['id'];
    instructionId: InstructionAttrs['id'];
};
