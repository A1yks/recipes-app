import { CategoryAttrs } from '@backend/models/Category';
import { InstructionAttrs } from '@backend/models/Instruction';
import { NutritionAttrs } from '@backend/models/Nutrition';
import { RecipeAttrs, RecipeAuthor } from '@backend/models/Recipe';
import { RecipePartAttrs } from '@backend/models/RecipePart';
import { RecipePhotoAttrs } from '@backend/models/RecipePhoto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUserRecipesRes } from 'src/services/api/types';

export type ClientRecipe = RecipeAttrs & {
    author: RecipeAuthor;
    categories: CategoryAttrs[];
    instructions: InstructionAttrs[];
    nutrition: NutritionAttrs | null;
    parts: RecipePartAttrs[];
    photos: RecipePhotoAttrs[];
    rating: number;
};

export type UserRecipesState = {
    amount: number;
    recipePreviews: RecipeAttrs[];
    selectedRecipe: ClientRecipe | null;
};

const initialState: UserRecipesState = {
    amount: 0,
    recipePreviews: [],
    selectedRecipe: null,
};

const userRecipesSlice = createSlice({
    name: 'userRecipes',
    initialState,
    reducers: {
        setRecipePreviews(state, action: PayloadAction<GetUserRecipesRes>) {
            const { count, recipes } = action.payload;

            state.amount = count;
            state.recipePreviews = recipes;
        },
    },
});

export const { setRecipePreviews } = userRecipesSlice.actions;

export default userRecipesSlice;
