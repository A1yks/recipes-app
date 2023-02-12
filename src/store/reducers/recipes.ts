import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/services/api';
import { DeleteRatingRes, RatingRes } from 'src/services/api/types';
import { ClientRecipe } from './userRecipes';

export type OpenedRecipeData = {
    recipe: ClientRecipe | null;
    userRating?: number;
};

export type RecipesState = {
    openedRecipeData: OpenedRecipeData;
};

const initialState: RecipesState = {
    openedRecipeData: {
        recipe: null,
        userRating: undefined,
    },
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setOpenedRecipeData(state, action: PayloadAction<OpenedRecipeData>) {
            state.openedRecipeData = action.payload;
        },
    },
    extraReducers(builder) {
        function changeRatingReducer(
            state: RecipesState,
            action: PayloadAction<API.Response<RatingRes | DeleteRatingRes>>
        ) {
            if (state.openedRecipeData.recipe !== null) {
                const { recipeRating, userRating } = action.payload.data;

                state.openedRecipeData.recipe.rating = recipeRating;
                state.openedRecipeData.userRating = userRating === null ? undefined : userRating;
            }
        }

        return builder
            .addMatcher(api.endpoints.getRecipe.matchFulfilled, (state, action) => {
                state.openedRecipeData = action.payload.data;
            })
            .addMatcher(api.endpoints.editRecipe.matchFulfilled, (state, action) => {
                if (state.openedRecipeData.recipe !== null) {
                    const recipeData = action.payload.data;

                    state.openedRecipeData.recipe = { ...state.openedRecipeData.recipe, ...recipeData };
                }
            })
            .addMatcher(api.endpoints.rateRecipe.matchFulfilled, changeRatingReducer)
            .addMatcher(api.endpoints.editRating.matchFulfilled, changeRatingReducer)
            .addMatcher(api.endpoints.deleteRating.matchFulfilled, changeRatingReducer)
            .addMatcher(api.endpoints.uploadRecipePhotos.matchFulfilled, (state, action) => {
                if (state.openedRecipeData.recipe !== null) {
                    state.openedRecipeData.recipe.photos.push(...action.payload.data);
                }
            })
            .addMatcher(api.endpoints.deleteRecipePhoto.matchFulfilled, (state, action) => {
                const { recipe } = state.openedRecipeData;
                const { photoId: deletedPhotoId } = action.meta.arg.originalArgs;

                if (recipe !== null) {
                    recipe.photos = recipe.photos.filter((photo) => photo.id !== deletedPhotoId);
                }
            });
    },
});

export const { setOpenedRecipeData } = recipesSlice.actions;

export default recipesSlice;
