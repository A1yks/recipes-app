import { EditUserReq } from '@backend/controllers/user/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import setAuthHeaders from 'src/utils/setAuthHeaders';
import { AuthReq, AuthRes, EditAccountDataRes } from './types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: setAuthHeaders,
    }),
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
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
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
    }),
});

export const { getAccessToken } = api.endpoints;
export const {
    useAuthMutation,
    useLogoutMutation,
    useDeleteAccountMutation,
    useDeleteAvatarMutation,
    useEditAccountDataMutation,
    useGetAccessTokenQuery,
    useUploadAvatarMutation,
    util: { getRunningQueriesThunk },
} = api;
