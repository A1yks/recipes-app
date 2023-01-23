import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { api } from 'src/services/api';
import authReducer from './reducers/auth';

const combineReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
});

const makeStore = () =>
    configureStore({
        reducer(state, action) {
            if (action.type === HYDRATE) {
                return { ...state, ...action.payload };
            }

            return combineReducer(state, action);
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(api.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
