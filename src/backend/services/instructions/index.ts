import db from 'backend/db';
import Instruction, { InstructionAttrs } from 'backend/models/Instruction';
import { RecipeAttrs } from 'backend/models/Recipe';
import { ErrorTypes } from 'backend/types/errors';
import { Deferrable, Op } from 'sequelize';
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
        const { stepNumber, text } = instructionData;
        const instruction = await Instruction.findByPk(instructionId);
        let anotherInstruction: Instruction | null = null;

        if (instruction === null) {
            throw new Error('Instruction with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        // If there is an instruction with stepNumber from instructionData, then step numbers need to be swapped
        if (stepNumber !== undefined) {
            anotherInstruction = await Instruction.findOne({
                where: { recipeId: instruction.recipeId, stepNumber },
            });

            if (anotherInstruction !== null) {
                anotherInstruction.stepNumber = instruction.stepNumber;
            }

            instruction.stepNumber = stepNumber;
        }

        if (text !== undefined) {
            instruction.text = text;
        }

        return await db.transaction({ deferrable: new Deferrable.SET_DEFERRED() }, async () => {
            const [updatedInstruction] = await Promise.all([instruction.save(), anotherInstruction?.save()]);

            return updatedInstruction;
        });
    }

    export async function getInstructions(recipeId: RecipeAttrs['id']) {
        return await Instruction.findAll({
            where: {
                recipeId,
            },
            order: [['stepNumber', 'ASC']],
        });
    }

    export async function getInstruction(instructionData: Partial<InstructionAttrs>) {
        return await Instruction.findOne({ where: instructionData });
    }

    export async function deleteInstruction(instructionId: Instruction['id'], recipeId: RecipeAttrs['id']) {
        const instruction = await Instruction.findByPk(instructionId);

        if (instruction === null) {
            throw new Error('Instruction with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        const stepNumberToDelete = instruction.stepNumber;

        await db.transaction(async () => {
            await Promise.all([
                await instruction.destroy(),
                await Instruction.decrement(
                    {
                        stepNumber: 1,
                    },
                    {
                        where: {
                            recipeId,
                            stepNumber: {
                                [Op.gt]: stepNumberToDelete,
                            },
                        },
                    }
                ),
            ]);
        });
    }
}

export default InstructionsService;
