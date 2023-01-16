import RecipePhotosController from 'backend/controllers/recipePhotos';
import { checkUserPermissionsForOperationsWithRecipePhotos } from 'backend/controllers/recipePhotos/permissions';
import { deleteRecipePhotoSchema } from 'backend/controllers/recipePhotos/validation';
import PermissionsMiddleware from 'backend/middleware/permissions';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import TokensMiddleware from 'backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

// req.body is populated after a file is uploaded, so validation and permissions check are done in the controller
router.post('/upload', TokensMiddleware.verifyAcessToken, RecipePhotosController.uploadPhotos);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteRecipePhotoSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithRecipePhotos),
    RecipePhotosController.deletePhoto
);

export default router;
