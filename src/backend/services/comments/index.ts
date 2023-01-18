import Comment, { CommentAttrs } from 'backend/models/Comment';
import { ErrorTypes } from 'backend/types/errors';
import getHierarchy from 'backend/utils/getHierarchy';
import { CommentCreationData } from './type';

namespace CommentsService {
    export async function createComment(commentData: CommentCreationData) {
        return await Comment.create(commentData);
    }

    export async function getComment(commentData: Partial<CommentAttrs>) {
        return await Comment.findOne({ where: commentData });
    }

    export async function getComments(commentsData: Partial<CommentAttrs>, limit?: number, offset?: number) {
        return await getHierarchy(
            Comment,
            {
                where: commentsData,
                paranoid: false,
                limit,
                offset,
            },
            'parentId',
            'replies'
        );
    }

    export async function editComment(commentText: Comment['content'], commentId: Comment['id']) {
        const comment = await getCommentWithErrorCheck(commentId);

        return await comment.update({ content: commentText });
    }

    export async function deleteComment(commentId: Comment['id']) {
        const comment = await getCommentWithErrorCheck(commentId);

        await comment.destroy();
    }

    async function getCommentWithErrorCheck(commentId: Comment['id']) {
        const comment = await getComment({ id: commentId });

        if (comment === null) {
            throw new Error('Comment with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return comment;
    }
}

export default CommentsService;
