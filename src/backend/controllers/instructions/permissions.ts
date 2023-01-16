import InstructionsService from 'backend/services/instructions';
import checkRecipePermissionHelper from 'backend/utils/checkRecipePermissionsHelper';
import { DeleteInstructionReq, EditInstructionReq } from './types';

async function checkInstructionsPermissions(req: Server.Request<EditInstructionReq | DeleteInstructionReq>) {
    const { recipeId, instructionId } = req.body;
    const instruction = await InstructionsService.getInstruction({ id: instructionId, recipeId });

    return instruction !== null;
}

export const checkUserPermissionsForOperationsWithInstruction =
    checkRecipePermissionHelper(checkInstructionsPermissions);
