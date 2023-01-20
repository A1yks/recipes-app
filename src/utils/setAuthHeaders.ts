import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { AppState } from 'store';
import { AuthState } from 'store/reducers/auth';

type PrepareHeadersType = NonNullable<FetchBaseQueryArgs['prepareHeaders']>;
type ApiType = Parameters<PrepareHeadersType>[1];

function setAuthHeaders(headers: Headers, api: ApiType): Headers;
function setAuthHeaders(headers: Headers, token: string): Headers;
function setAuthHeaders(headers: Headers, apiOrToken: ApiType | string) {
    let token: AuthState['token'];

    if (typeof apiOrToken === 'string') {
        token = apiOrToken;
    } else {
        const state = apiOrToken.getState() as AppState;
        token = state.auth.token;
    }

    if (token !== null) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
}

export default setAuthHeaders;
