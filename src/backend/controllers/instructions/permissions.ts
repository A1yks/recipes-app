import { UserAttrs } from 'backend/models/User';
import InstructionsService from 'backend/services/instructions';
import { DeleteInstructionReq, EditInstructionReq } from './types';

async function checkUserPermissionsForOperationsWithInstruction(
    userId: UserAttrs['id'],
    req: Server.Request<EditInstructionReq | DeleteInstructionReq>
) {
    const { recipeId, instructionId } = req.body;
    const instruction = await InstructionsService.getInstruction({ id: instructionId, recipeId });

    return instruction !== null;
}

export default checkUserPermissionsForOperationsWithInstruction;
