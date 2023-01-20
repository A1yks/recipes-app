import { CategoryAttrs } from '@backend/models/Category';
import { RecipeAttrs, RecipeCreationAttrs } from '@backend/models/Recipe';

export type CreateRecipeReq = Omit<RecipeCreationAttrs, 'id' | 'authorId'>;

export type GetRecipeReq = {
    recipeId: RecipeAttrs['id'];
};

export type GetRecipesReq = {
    limit?: number;
    offset?: number;
    categoryIds?: string;
};

export type DeleteRecipeReq = GetRecipeReq;

export type EditRecipeReq = Partial<CreateRecipeReq> & GetRecipeReq;

export type AddCategoryToRecipeReq = {
    categoryId: CategoryAttrs['id'];
    recipeId: RecipeAttrs['id'];
};

export type DeleteCategoryFromRecipeReq = AddCategoryToRecipeReq;
