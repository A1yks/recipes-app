import Instruction from 'backend/models/Instruction';
import createUniqueDeferrable from 'backend/utils/createUniqueDeferrable';

async function createSpecialIndexes() {
    await createUniqueDeferrable(Instruction, ['recipeId', 'stepNumber']);
}

export default createSpecialIndexes;
