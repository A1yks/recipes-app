import InstructionsService from 'backend/services/instructions';
import { ErrorTypes } from 'backend/types/errors';
import errorsHandler from 'backend/utils/errorsHander';
import { CreateInstructionReq, DeleteInstructionReq, EditInstructionReq, GetInstructionsReq } from './types';

namespace InstructionsController {
    export async function createInstruction(req: Server.Request<CreateInstructionReq>, res: Server.Response) {
        const { instructionText, stepNumber, recipeId } = req.body;

        try {
            const instruction = await InstructionsService.createInstruction(instructionText, stepNumber, recipeId);

            res.status(201).json({ data: instruction });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpecte error occured while creating new instruction',
            });
        }
    }

    export async function getInstructions(req: Server.Request<never, GetInstructionsReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const instructions = InstructionsService.getInstructions(recipeId);

            res.status(200).json({ data: instructions });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining the instructions',
            });
        }
    }

    export async function editInstruction(req: Server.Request<EditInstructionReq>, res: Server.Response) {
        const { instructionText, stepNumber, instructionId } = req.body;

        try {
            const updatedInstruction = await InstructionsService.editInstruction(
                { text: instructionText, stepNumber },
                instructionId
            );

            if (updatedInstruction === null) {
                throw new Error('Instruction with provided id does not exist', {
                    cause: ErrorTypes.INSTRUCTION_NOT_FOUND,
                });
            }

            res.status(200).json({ data: updatedInstruction });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the instruction',
                expectedErrors: [[ErrorTypes.INSTRUCTION_NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteInstruction(req: Server.Request<DeleteInstructionReq>, res: Server.Response) {
        const { insturctionId } = req.body;

        try {
            const deleted = await InstructionsService.deleteInstruction(insturctionId);

            if (!deleted) {
                throw new Error();
            }

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpecte error occured while deleting the instruction',
            });
        }
    }
}

export default InstructionsController;
