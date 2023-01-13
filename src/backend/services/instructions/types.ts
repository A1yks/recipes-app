import { InstructionAttrs } from 'backend/models/Instruction';

export type EditInstructionData = {
    text?: InstructionAttrs['text'];
    stepNumber?: InstructionAttrs['stepNumber'];
};
