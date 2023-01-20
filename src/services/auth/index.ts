import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthReq, AuthRes } from './types';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    endpoints: (build) => ({
        auth: build.mutation<API.Response<AuthRes>, AuthReq>({
            query: ({ type, ...bodyData }) => ({
                url: `auth/${type}`,
                method: 'POST',
                body: bodyData,
            }),
        }),
    }),
});

export const { useAuthMutation } = authAPI;
