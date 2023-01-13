import NutritionController from 'backend/controllers/nutrition';
import {
    createNutritionSchema,
    editNutritionSchema,
    getNutritionSchema,
} from 'backend/controllers/nutrition/validation';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
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
    ValidationMiddleware.validate(editNutritionSchema),
    NutritionController.editNutrition
);

export default router;
