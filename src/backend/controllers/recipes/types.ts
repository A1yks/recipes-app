import { CategoryAttrs } from 'backend/models/Category';
import { InstructionAttrs } from 'backend/models/Instruction';
import { NutritionAttrs } from 'backend/models/Nutrition';
import { RecipeAttrs } from 'backend/models/Recipe';

export type CreateRecipeReq = Omit<RecipeAttrs, 'id'> & {
    instructions: InstructionAttrs['text'];
    categories: CategoryAttrs['id'];
    nutrition: Omit<NutritionAttrs, 'id' | 'recipeId'>;
};

export type GetRecipeReq = {
    recipeId: RecipeAttrs['id'];
};

export type GetRecipesReq = {
    limit?: number;
    offset?: number;
};

export type DeleteRecipeReq = GetRecipeReq;

export type EditRecipeReq = Partial<Omit<CreateRecipeReq, 'authorId'>> & GetRecipeReq;
