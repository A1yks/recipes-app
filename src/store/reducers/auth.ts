import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAttrs } from '@backend/models/User';
import { api } from 'src/services/api';
import { AuthRes } from 'src/services/api/types';

export type User = Omit<UserAttrs, 'password'>;

export interface AuthState {
    user: User | null;
    token: string | null;
}

const getInitialState = (): AuthState => ({
    user: null,
    token: null,
});

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {},
    extraReducers(builder) {
        function setAuthInfoReducer(state: AuthState, action: PayloadAction<API.Response<AuthRes>>) {
            const { user, accessToken } = action.payload.data;

            state.user = user;
            state.token = accessToken;
        }

        return builder
            .addMatcher(api.endpoints.auth.matchFulfilled, setAuthInfoReducer)
            .addMatcher(api.endpoints.getAccessToken.matchFulfilled, setAuthInfoReducer)
            .addMatcher(api.endpoints.logout.matchFulfilled, getInitialState);
    },
});

export default authSlice.reducer;
