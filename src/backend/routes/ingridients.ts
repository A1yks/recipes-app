import IngridientsController from '@backend/controllers/ingridients';
import {
    checkUserPermissionsForCreateIngridientOperation,
    checkUserPermissionsForOperationsWithIngridients,
} from '@backend/controllers/ingridients/permissions';
import {
    createIngridientSchema,
    deleteIngridientSchema,
    editIngridientSchema,
    getIngridientsSchema,
} from '@backend/controllers/ingridients/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import ValidationMiddleware from '@backend/middleware/schema-validation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createIngridientSchema),
    PermissionsMiddleware.check(checkUserPermissionsForCreateIngridientOperation),
    IngridientsController.createIngridient
);

router.get(
    '/:recipeId',
    ValidationMiddleware.validate(getIngridientsSchema, { validateParams: true }),
    IngridientsController.getIngridients
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editIngridientSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithIngridients),
    IngridientsController.editIngridient
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteIngridientSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithIngridients),
    IngridientsController.deleteIngridient
);

export default router;
