import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import setAuthHeaders from 'src/utils/setAuthHeaders';
import { AuthReq, AuthRes } from './types';

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
        logout: build.mutation({
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
            transformResponse(response: API.Response<AuthRes>, meta, arg) {
                const cookie = meta?.response?.headers.get('set-cookie');

                if (typeof cookie === 'string') {
                    response.data.cookie = cookie;
                }

                return response;
            },
        }),
    }),
});

export const { getAccessToken } = api.endpoints;
export const {
    useAuthMutation,
    useLogoutMutation,
    util: { getRunningQueriesThunk },
} = api;
