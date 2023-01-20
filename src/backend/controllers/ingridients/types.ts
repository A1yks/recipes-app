import { IngridientAttrs } from '@backend/models/Ingridient';
import { RecipeAttrs } from '@backend/models/Recipe';
import { RecipePartAttrs } from '@backend/models/RecipePart';

export type CreateIngridientReq = {
    recipePartId: RecipePartAttrs['id'];
    recipeId: RecipeAttrs['id'];
    ingridientData: Omit<IngridientAttrs, 'id' | 'partId' | 'recipeId'>;
};

export type GetIngridientsReq = {
    recipeId: RecipeAttrs['id'];
};

export type DeleteIngridientReq = {
    recipeId: RecipeAttrs['id'];
    recipePartId: RecipePartAttrs['id'];
    ingridientId: IngridientAttrs['id'];
};

export type EditIngridientReq = DeleteIngridientReq & {
    ingridientData: Partial<Omit<CreateIngridientReq['ingridientData'], 'recipeId' | 'recipePartId'>>;
};
