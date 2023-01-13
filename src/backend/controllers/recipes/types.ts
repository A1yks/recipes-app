import { RecipeAttrs, RecipeCreationAttrs } from 'backend/models/Recipe';

export type CreateRecipeReq = Omit<RecipeCreationAttrs, 'id' | 'authorId'>;

export type GetRecipeReq = {
    recipeId: RecipeAttrs['id'];
};

export type GetRecipesReq = {
    limit?: number;
    offset?: number;
};

export type DeleteRecipeReq = GetRecipeReq;

export type EditRecipeReq = Partial<CreateRecipeReq> & GetRecipeReq;
