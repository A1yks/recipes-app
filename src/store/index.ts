import { combineReducers, configureStore, Reducer, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { api } from 'src/services/api';
import authReducer from './reducers/auth';
import userRecipesReducer from './reducers/userRecipes';

const combineReducer = combineReducers({
    auth: authReducer,
    userRecipes: userRecipesReducer,
    [api.reducerPath]: api.reducer,
});

const reducer: Reducer<ReturnType<typeof combineReducer>, AnyAction> = (state, action) => {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    }

    if (api.endpoints.logout.matchFulfilled(action) || api.endpoints.deleteAccount.matchFulfilled(action)) {
        state = undefined;
    }

    return combineReducer(state, action);
};

const makeStore = () =>
    configureStore({
        reducer,
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(api.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
