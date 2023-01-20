import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { authAPI } from 'src/services/auth';
import authReducer from './reducers/auth';

const makeStore = () =>
    configureStore({
        reducer: {
            auth: authReducer,
            [authAPI.reducerPath]: authAPI.reducer,
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(authAPI.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
