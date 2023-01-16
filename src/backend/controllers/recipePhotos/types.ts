import { RecipeAttrs } from 'backend/models/Recipe';
import { RecipePhotoAttrs } from 'backend/models/RecipePhoto';

export type UploadRecipePhotoReq = {
    recipeId: RecipeAttrs['id'];
};

export type DeleteRecipePhotoReq = {
    recipeId: RecipeAttrs['id'];
    photoId: RecipePhotoAttrs['id'];
};
