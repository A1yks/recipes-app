import UserController from '@backend/controllers/user';
import { deleteAccountSchema, editAccountDataSchema } from '@backend/controllers/user/validation';
import ValidationMiddleware from '@backend/middleware/schemaValidation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post('/avatar/upload', TokensMiddleware.verifyAcessToken, UserController.uploaAvatar);

router.delete('/avatar/delete', TokensMiddleware.verifyAcessToken, UserController.deleteAvatar);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editAccountDataSchema),
    UserController.editAccountData
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteAccountSchema),
    UserController.deleteAccount
);

router.get('/recipes', TokensMiddleware.verifyAcessToken, UserController.getUserRecipes);

export default router;
