import { RecipeAttrs } from 'backend/models/Recipe';
import { RecipePartAttrs } from 'backend/models/RecipePart';

export type CreateRecipePartReq = {
    recipeId: RecipeAttrs['id'];
    partName: RecipePartAttrs['partName'];
};

export type GetRecipePartsReq = {
    recipeId: RecipeAttrs['id'];
};

export type EditRecipePartNameReq = {
    recipeId: RecipeAttrs['id'];
    recipePartId: RecipePartAttrs['id'];
    partName: RecipePartAttrs['partName'];
};

export type DeleteRecipePartReq = {
    recipeId: RecipeAttrs['id'];
    recipePartId: RecipePartAttrs['id'];
};
