import { CategoryAttrs } from '@backend/models/Category';
import { InstructionAttrs } from '@backend/models/Instruction';
import { NutritionAttrs } from '@backend/models/Nutrition';
import { RecipeAttrs } from '@backend/models/Recipe';
import { RecipePartAttrs } from '@backend/models/RecipePart';
import { RecipePhotoAttrs } from '@backend/models/RecipePhoto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/services/api';
import { GetUserRecipesRes } from 'src/services/api/types';

export type ClientRecipe = RecipeAttrs & {
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
    extraReducers(builder) {
        // return builder.addMatcher(api.endpoints.getUserRecipes.matchFulfilled, (state, action) => {
        //     const { count, recipes } = action.payload.data;
        //     state.amount = count;
        //     state.recipePreviews = recipes;
        // })
        // .addMatcher(api.endpoints.createRecipe.matchFulfilled, (state, action) => {
        //     const recipe = action.payload.data;
        //     state.recipePreviews.push(recipe);
        // })
        // .addMatcher(api.endpoints.deleteRecipe.matchFulfilled, (state, action) => {
        //     const deletedRecipeId = action.meta.arg.originalArgs;
        //     state.recipePreviews = state.recipePreviews.filter((r) => r.id !== deletedRecipeId);
        // })
    },
});

export const { setRecipePreviews } = userRecipesSlice.actions;

export default userRecipesSlice.reducer;
