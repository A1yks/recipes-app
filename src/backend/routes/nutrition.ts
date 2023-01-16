import NutritionController from 'backend/controllers/nutrition';
import { checkUserPermissionsForOperationsWithNutrition } from 'backend/controllers/nutrition/permissions';
import {
    createNutritionSchema,
    editNutritionSchema,
    getNutritionSchema,
} from 'backend/controllers/nutrition/validation';
import { checkUserPermissionsForOperationsWithRecipe } from 'backend/controllers/recipes/permissions';
import PermissionsMiddleware from 'backend/middleware/permissions';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    ValidationMiddleware.validate(createNutritionSchema),
    NutritionController.createNutrition
);

router.get(
    '/:recipeId',
    ValidationMiddleware.validate(getNutritionSchema, { validateParams: true }),
    NutritionController.getNutrition
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithNutrition),
    ValidationMiddleware.validate(editNutritionSchema),
    NutritionController.editNutrition
);

export default router;
