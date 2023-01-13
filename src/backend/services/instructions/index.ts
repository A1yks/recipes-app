import Instruction from 'backend/models/Instruction';
import { RecipeAttrs } from 'backend/models/Recipe';
import { EditInstructionData } from './types';

namespace InstructionsService {
    export async function createInstruction(text: string, stepNumber: number, recipeId: RecipeAttrs['id']) {
        return await Instruction.create({
            text,
            stepNumber,
            recipeId,
        });
    }

    export async function createInstructions(instructions: Instruction['text'][], recipeid: RecipeAttrs['id']) {
        return await Promise.all(
            instructions.map(async (instructionText, index) => {
                return await createInstruction(instructionText, index + 1, recipeid);
            })
        );
    }

    export async function editInstruction(instructionData: EditInstructionData, instructionId: Instruction['id']) {
        const instruction = await Instruction.findByPk(instructionId);

        if (instruction === null) {
            return null;
        }

        return await instruction.update(instructionData);
    }

    export async function getInstructions(recipeId: RecipeAttrs['id']) {
        return await Instruction.findAll({
            where: {
                recipeId,
            },
        });
    }

    export async function deleteInstruction(instructionId: Instruction['id']) {
        const deletedRows = await Instruction.destroy({ where: { id: instructionId } });

        return deletedRows > 0;
    }
}

export default InstructionsService;
