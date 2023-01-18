import { UserAttrs } from 'backend/models/User';
import CommentsService from 'backend/services/comments';
import { DeleteCommentReq, EditCommentReq } from './types';

export async function checkUserPermissionsForOperationsWithComment(
    req: Server.Request<EditCommentReq | DeleteCommentReq>,
    userId: UserAttrs['id']
) {
    const { commentId, recipeId } = req.body;
    const comment = CommentsService.getComment({ id: commentId, recipeId, userId });

    return comment !== null;
}
