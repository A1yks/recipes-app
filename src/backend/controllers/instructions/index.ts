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
                unexpectedErrMsg: 'An unexpected error occured while creating new instruction',
            });
        }
    }

    export async function getInstructions(req: Server.Request<never, GetInstructionsReq>, res: Server.Response) {
        const { recipeId } = req.params;

        try {
            const instructions = await InstructionsService.getInstructions(recipeId);

            res.status(200).json({ data: instructions });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining the instructions',
            });
        }
    }

    export async function editInstruction(req: Server.Request<EditInstructionReq>, res: Server.Response) {
        const { text, stepNumber, instructionId } = req.body;

        try {
            const updatedInstruction = await InstructionsService.editInstruction({ text, stepNumber }, instructionId);

            res.status(200).json({ data: updatedInstruction });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the instruction',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteInstruction(req: Server.Request<DeleteInstructionReq>, res: Server.Response) {
        const { instructionId, recipeId } = req.body;

        try {
            await InstructionsService.deleteInstruction(instructionId, recipeId);

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the instruction',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default InstructionsController;
