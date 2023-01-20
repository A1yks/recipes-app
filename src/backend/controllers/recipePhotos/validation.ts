import { idSchema } from '@backend/common/schemas';
import Joi from 'joi';
import { DeleteRecipePhotoReq, UploadRecipePhotoReq } from './types';

export const uploadRecipePhotosSchema = Joi.object<UploadRecipePhotoReq>().keys({
    recipeId: idSchema,
});

export const deleteRecipePhotoSchema = Joi.object<DeleteRecipePhotoReq>().keys({
    recipeId: idSchema,
    photoId: idSchema,
});
