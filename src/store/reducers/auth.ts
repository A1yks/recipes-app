import { createSlice } from '@reduxjs/toolkit';
import { UserAttrs } from '@backend/models/User';
import { UserInfoAttrs } from '@backend/models/UserInfo';
import { authAPI } from 'src/services/auth';

export type User = Omit<UserAttrs, 'password'> & Omit<UserInfoAttrs, 'id' | 'userId'>;

export interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(authAPI.endpoints.auth.matchFulfilled, (state, action) => {
            const { user, accessToken } = action.payload.data;

            state.user = user;
            state.token = accessToken;
        }),
});

export default authSlice.reducer;
