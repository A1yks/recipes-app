import { DeleteRatingReq, EditRatingReq, RateRecipeReq } from '@backend/controllers/rating/types';
import { DeleteRecipePhotoReq } from '@backend/controllers/recipePhotos/types';
import { EditRecipeReq } from '@backend/controllers/recipes/types';
import { EditUserReq } from '@backend/controllers/user/types';
import { RecipeAttrs } from '@backend/models/Recipe';
import { RecipePhotoAttrs } from '@backend/models/RecipePhoto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ClientRecipe } from 'src/store/reducers/userRecipes';
import {
    AuthReq,
    AuthRes,
    DeleteRatingRes,
    EditAccountDataRes,
    GetRecipeRes,
    GetUserRecipesRes,
    RatingRes,
} from './types';
import baseQueryWithReauth from './helpers/baseQueryWithReauth';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserRecipes', 'OpenedRecipe'],
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        auth: build.mutation<API.Response<AuthRes>, AuthReq>({
            query: ({ type, ...bodyData }) => ({
                url: `/auth/${type}`,
                method: 'POST',
                body: bodyData,
            }),
            invalidatesTags: ['UserRecipes', 'OpenedRecipe'],
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['UserRecipes', 'OpenedRecipe'],
        }),
        getAccessToken: build.query<API.Response<AuthRes>, string>({
            query: (cookie) => ({
                url: '/tokens/renew',
                headers: {
                    cookie,
                },
            }),
            transformResponse(response: API.Response<AuthRes>, meta) {
                const cookie = meta?.response?.headers.get('set-cookie');

                if (typeof cookie === 'string') {
                    response.data.cookie = cookie;
                }

                return response;
            },
        }),
        deleteAccount: build.mutation<void, string>({
            query: (password) => ({
                url: '/user/delete',
                method: 'DELETE',
                body: {
                    password,
                },
            }),
        }),
        editAccountData: build.mutation<API.Response<EditAccountDataRes>, EditUserReq>({
            query: (data) => ({
                url: '/user/edit',
                method: 'PATCH',
                body: data,
            }),
        }),
        uploadAvatar: build.mutation<API.Response<EditAccountDataRes>, FormData>({
            query: (data) => ({
                url: '/user/avatar/upload',
                method: 'POST',
                body: data,
            }),
        }),
        deleteAvatar: build.mutation<void, void>({
            query: () => ({
                url: '/user/avatar/delete',
                method: 'DELETE',
            }),
        }),
        getUserRecipes: build.query<API.Response<GetUserRecipesRes>, number>({
            query: (page) => ({
                url: '/user/recipes',
                params: { page },
            }),
            providesTags: ['UserRecipes'],
        }),
        createRecipe: build.mutation<API.Response<ClientRecipe>, string>({
            query: (title) => ({
                url: '/recipes/create',
                method: 'POST',
                body: { title },
            }),
            invalidatesTags: ['UserRecipes'],
        }),
        deleteRecipe: build.mutation<void, RecipeAttrs['id']>({
            query: (recipeId) => ({
                url: '/recipes/delete',
                method: 'DELETE',
                body: { recipeId },
            }),
            invalidatesTags: ['UserRecipes'],
        }),
        getRecipe: build.query<API.Response<GetRecipeRes>, RecipeAttrs['id']>({
            query: (recipeId) => ({
                url: `/recipes/${recipeId}`,
            }),
            providesTags: ['OpenedRecipe'],
        }),
        editRecipe: build.mutation<API.Response<RecipeAttrs>, EditRecipeReq>({
            query: (newData) => ({
                url: '/recipes/edit',
                method: 'PATCH',
                body: newData,
            }),
        }),
        rateRecipe: build.mutation<API.Response<RatingRes>, RateRecipeReq>({
            query: (ratingData) => ({
                url: '/recipes/rating/rate',
                method: 'POST',
                body: ratingData,
            }),
        }),
        editRating: build.mutation<API.Response<RatingRes>, EditRatingReq>({
            query: (ratingData) => ({
                url: '/recipes/rating/edit',
                method: 'PATCH',
                body: ratingData,
            }),
        }),
        deleteRating: build.mutation<API.Response<DeleteRatingRes>, DeleteRatingReq>({
            query: (ratingData) => ({
                url: '/recipes/rating/delete',
                method: 'DELETE',
                body: ratingData,
            }),
        }),
        uploadRecipePhotos: build.mutation<API.Response<RecipePhotoAttrs[]>, FormData>({
            query: (data) => ({
                url: '/recipes/photos/upload',
                method: 'POST',
                body: data,
            }),
        }),
        deleteRecipePhoto: build.mutation<void, DeleteRecipePhotoReq>({
            query: (data) => ({
                url: '/recipes/photos/delete',
                method: 'DELETE',
                body: data,
            }),
        }),
    }),
});

export const { getAccessToken, getRecipe } = api.endpoints;
export const {
    util: { getRunningQueriesThunk },
    useAuthMutation,
    useLogoutMutation,
    useDeleteAccountMutation,
    useDeleteAvatarMutation,
    useEditAccountDataMutation,
    useGetAccessTokenQuery,
    useUploadAvatarMutation,
    useGetUserRecipesQuery,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeQuery,
    useEditRecipeMutation,
    useRateRecipeMutation,
    useEditRatingMutation,
    useDeleteRatingMutation,
    useUploadRecipePhotosMutation,
    useDeleteRecipePhotoMutation,
} = api;
