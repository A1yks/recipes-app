import { NutritionAttrs } from '@backend/models/Nutrition';
import { RecipeAttrs } from '@backend/models/Recipe';

export type CreateNutritionReq = {
    recipeId: RecipeAttrs['id'];
    nutrition: Omit<NutritionAttrs, 'id' | 'recipeId'>;
};

export type GetNutritionReq = {
    recipeId: RecipeAttrs['id'];
};

export type EditNutritionReq = {
    recipeId: RecipeAttrs['id'];
    nutritionId: NutritionAttrs['id'];
    nutrition: Partial<CreateNutritionReq['nutrition']>;
};
