import InstructionsController from 'backend/controllers/instructions';
import {
    createInstructionSchema,
    deleteInstructionSchema,
    editInstructionSchema,
    getInstructionsSchema,
} from 'backend/controllers/instructions/validation';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createInstructionSchema),
    InstructionsController.createInstruction
);

router.get(
    '/:recipeId',
    ValidationMiddleware.validate(getInstructionsSchema, { validateParams: true }),
    InstructionsController.getInstructions
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editInstructionSchema),
    InstructionsController.editInstruction
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteInstructionSchema),
    InstructionsController.deleteInstruction
);

export default router;
