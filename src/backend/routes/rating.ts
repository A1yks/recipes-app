import RatingController from '@backend/controllers/rating';
import { checkUserPermissionsForOperationsWithRating } from '@backend/controllers/rating/permissions';
import { deleteRatingSchema, editRatingSchema, rateRecipeSchema } from '@backend/controllers/rating/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import ValidationMiddleware from '@backend/middleware/schema-validation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/rate',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(rateRecipeSchema),
    RatingController.rateRecipe
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editRatingSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRating),
    RatingController.editRating
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteRatingSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRating),
    RatingController.deleteRating
);

export default router;
