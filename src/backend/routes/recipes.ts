import RecipesController from 'backend/controllers/recipes';
import { createRecipeSchema, getRecipeSchema, getRecipesSchema } from 'backend/controllers/recipes/validation';
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

router.delete('/delete');

export default router;
