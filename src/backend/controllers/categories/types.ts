import { CategoryAttrs } from '@backend/models/Category';

export type CreateCategoryReq = {
    categoryName: CategoryAttrs['name'];
};

export type GetCategoriesReq = {
    categoryIds?: string;
};

export type SearchCategoriesReq = {
    categoryName: CategoryAttrs['name'];
};

export type EditCategoryReq = {
    categoryId: CategoryAttrs['id'];
    categoryName: CategoryAttrs['name'];
};

export type DeleteCategoryReq = {
    categoryId: CategoryAttrs['id'];
};
