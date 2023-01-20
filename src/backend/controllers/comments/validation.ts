import { idSchema } from '@backend/common/schemas';
import Joi from 'joi';
import { CreateCommentReq, DeleteCommentReq, EditCommentReq, GetCommentsReq } from './types';

const contentSchema = Joi.string().min(2).max(1000).required();

export const createCommentSchema = Joi.object<CreateCommentReq>().keys({
    recipeId: idSchema,
    parentId: idSchema.allow(null),
    content: contentSchema,
});

export const getCommentsSchema = Joi.object<GetCommentsReq>().keys({
    recipeId: idSchema,
    limit: Joi.number().min(1),
    offset: Joi.number().min(0),
});

export const deleteCommentSchema = Joi.object<DeleteCommentReq>().keys({
    commentId: idSchema,
    recipeId: idSchema,
});

export const editCommentSchema = deleteCommentSchema.append<EditCommentReq>({
    content: contentSchema,
});
