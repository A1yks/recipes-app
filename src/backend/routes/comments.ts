import CommentsController from '@backend/controllers/comments';
import { checkUserPermissionsForOperationsWithComment } from '@backend/controllers/comments/permissions';
import {
    createCommentSchema,
    deleteCommentSchema,
    editCommentSchema,
    getCommentsSchema,
} from '@backend/controllers/comments/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import ValidationMiddleware from '@backend/middleware/schema-validation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createCommentSchema),
    CommentsController.createComment
);

router.get(
    '/',
    ValidationMiddleware.validate(getCommentsSchema, { validateQuery: true }),
    CommentsController.getComments
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editCommentSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithComment),
    CommentsController.editComment
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteCommentSchema),
    PermissionsMiddleware.check(checkUserPermissionsForOperationsWithComment),
    CommentsController.deleteComment
);

export default router;
