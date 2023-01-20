import InstructionsController from '@backend/controllers/instructions';
import { checkUserPermissionsForOperationsWithInstruction } from '@backend/controllers/instructions/permissions';
import {
    createInstructionSchema,
    deleteInstructionSchema,
    editInstructionSchema,
    getInstructionsSchema,
} from '@backend/controllers/instructions/validation';
import { checkUserPermissionsForOperationsWithRecipe } from '@backend/controllers/recipes/permissions';
import PermissionsMiddleware from '@backend/middleware/permissions';
import ValidationMiddleware from '@backend/middleware/schema-validation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
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
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithInstruction),
    ValidationMiddleware.validate(editInstructionSchema),
    InstructionsController.editInstruction
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithInstruction),
    ValidationMiddleware.validate(deleteInstructionSchema),
    InstructionsController.deleteInstruction
);

export default router;
