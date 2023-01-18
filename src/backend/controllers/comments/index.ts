import CommentsService from 'backend/services/comments';
import { ErrorTypes } from 'backend/types/errors';
import errorsHandler from 'backend/utils/errorsHander';
import { CreateCommentReq, DeleteCommentReq, EditCommentReq, GetCommentsReq } from './types';

namespace CommentsController {
    export async function createComment(req: Server.Request<CreateCommentReq>, res: Server.Response) {
        try {
            const comment = await CommentsService.createComment({ ...req.body, userId: req.userId! });

            res.status(201).json({ data: comment });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while creating a new comment',
            });
        }
    }

    export async function getComments(req: Server.Request<never, never, GetCommentsReq>, res: Server.Response) {
        const { recipeId, limit, offset } = req.query;

        try {
            const comments = await CommentsService.getComments({ recipeId }, limit, offset);

            res.status(200).json({ data: comments });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining comments',
            });
        }
    }

    export async function editComment(req: Server.Request<EditCommentReq>, res: Server.Response) {
        const { commentId, content } = req.body;

        try {
            const updatedComment = await CommentsService.editComment(content, commentId);

            res.status(200).json({ data: updatedComment });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing the comment',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteComment(req: Server.Request<DeleteCommentReq>, res: Server.Response) {
        const { commentId } = req.body;

        try {
            await CommentsService.deleteComment(commentId);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the comment',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default CommentsController;
