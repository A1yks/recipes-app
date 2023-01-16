import RecipePartsController from 'backend/controllers/recipeParts';
import { checkUserPermissionsForOperationsWithRecipePart } from 'backend/controllers/recipeParts/permissions';
import {
    createRecipePartSchema,
    deleteRecipePartSchema,
    editRecipePartNameSchema,
    getRecipePartsSchema,
} from 'backend/controllers/recipeParts/validation';
import { checkUserPermissionsForOperationsWithRecipe } from 'backend/controllers/recipes/permissions';
import PermissionsMiddleware from 'backend/middleware/permissions';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createRecipePartSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    RecipePartsController.createPart
);

router.get(
    '/:recipeId',
    ValidationMiddleware.validate(getRecipePartsSchema, { validateParams: true }),
    RecipePartsController.getParts
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editRecipePartNameSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipePart),
    RecipePartsController.editPartName
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteRecipePartSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipePart),
    RecipePartsController.deletePart
);

export default router;
