import { CommentAttrs } from 'backend/models/Comment';
import { RecipeAttrs } from 'backend/models/Recipe';

export type CreateCommentReq = Omit<CommentAttrs, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export type GetCommentsReq = {
    recipeId: RecipeAttrs['id'];
    limit?: number;
    offset?: number;
};

export type DeleteCommentReq = {
    recipeId: RecipeAttrs['id'];
    commentId: CommentAttrs['id'];
};

export type EditCommentReq = DeleteCommentReq & {
    content: CommentAttrs['content'];
};
