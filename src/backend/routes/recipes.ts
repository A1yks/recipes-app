import RecipesController from 'backend/controllers/recipes';
import { checkUserPermissionsForOperationsWithRecipe } from 'backend/controllers/recipes/permissions';
import {
    createRecipeSchema,
    deleteRecipeSchema,
    editRecipeSchema,
    getRecipeSchema,
    getRecipesSchema,
} from 'backend/controllers/recipes/validation';
import PermissionsMiddleware from 'backend/middleware/permissions';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createRecipeSchema),
    RecipesController.createRecipe
);

router.get(
    '/:recipeId',
    ValidationMiddleware.validate(getRecipeSchema, { validateParams: true }),
    RecipesController.getRecipe
);

router.get('/', ValidationMiddleware.validate(getRecipesSchema, { validateQuery: true }), RecipesController.getRecipe);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteRecipeSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    RecipesController.deleteRecipe
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editRecipeSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    RecipesController.editRecipe
);

export default router;
