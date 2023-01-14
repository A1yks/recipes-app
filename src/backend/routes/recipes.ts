import RecipesController from 'backend/controllers/recipes';
import { checkUserPermissionsForOperationsWithRecipe } from 'backend/controllers/recipes/permissions';
import {
    addCategoryToRecipeSchema,
    createRecipeSchema,
    deleteCategoryFromRecipeSchema,
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

router.get('/', ValidationMiddleware.validate(getRecipesSchema, { validateQuery: true }), RecipesController.getRecipes);

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

router.post(
    '/categories/add',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(addCategoryToRecipeSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    RecipesController.addCategoryToRecipe
);

router.delete(
    '/categories/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteCategoryFromRecipeSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipe),
    RecipesController.deleteCategoryFromRecipe
);

export default router;
