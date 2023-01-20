import Joi from 'joi';
import { idArrayStringPattern, idSchema } from '@backend/common/schemas';
import { CreateCategoryReq, DeleteCategoryReq, EditCategoryReq, GetCategoriesReq, SearchCategoriesReq } from './types';

const categoryNameSchema = Joi.string().min(2).max(20).required();

export const createCategorySchema = Joi.object<CreateCategoryReq>().keys({
    categoryName: categoryNameSchema,
});

export const getCategoriesSchema = Joi.object<GetCategoriesReq>().keys({
    categoryIds: idArrayStringPattern,
});

export const searchCategoriesSchema: Joi.ObjectSchema<SearchCategoriesReq> = createCategorySchema;

export const deleteCategorySchema = Joi.object<DeleteCategoryReq>().keys({
    categoryId: idSchema,
});

export const editCategorySchema = Joi.object<EditCategoryReq>().keys({
    categoryName: categoryNameSchema,
    categoryId: idSchema,
});
