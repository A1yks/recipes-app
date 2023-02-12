import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAttrs } from '@backend/models/User';
import { api } from 'src/services/api';
import { AuthRes } from 'src/services/api/types';

export type User = Omit<UserAttrs, 'password'>;

export interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInfo(state, action: PayloadAction<API.Response<AuthRes>>) {
            const { user, accessToken } = action.payload.data;

            state.user = user;
            state.token = accessToken;
        },
    },
    extraReducers(builder) {
        function setUserDataReducer(state: AuthState, action: PayloadAction<API.Response<User>>) {
            const user = action.payload.data;

            state.user = user;
        }

        function setAuthInfoReducer(state: AuthState, action: PayloadAction<API.Response<AuthRes>>) {
            authSlice.caseReducers.setAuthInfo(state, action);
        }

        return builder
            .addMatcher(api.endpoints.auth.matchFulfilled, setAuthInfoReducer)
            .addMatcher(api.endpoints.getAccessToken.matchFulfilled, setAuthInfoReducer)
            .addMatcher(api.endpoints.uploadAvatar.matchFulfilled, setUserDataReducer)
            .addMatcher(api.endpoints.editAccountData.matchFulfilled, (state, action) => {
                const updatedUserData = action.payload.data;

                state.user = { ...updatedUserData };
            })
            .addMatcher(api.endpoints.deleteAvatar.matchFulfilled, (state) => {
                if (state.user !== null) {
                    state.user.avatar = null;
                }
            });
    },
});

export default authSlice;
