import { combineReducers, configureStore, Reducer, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { api } from 'src/services/api';
import authSlice from './reducers/auth';
import userRecipesSlice from './reducers/userRecipes';
import recipesSlice from './reducers/recipes';

const combineReducer = combineReducers({
    auth: authSlice.reducer,
    recipes: recipesSlice.reducer,
    userRecipes: userRecipesSlice.reducer,
    [api.reducerPath]: api.reducer,
});

const reducer: Reducer<ReturnType<typeof combineReducer>, AnyAction> = (state, action) => {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    }

    if (
        (action.type === 'logout' ||
            api.endpoints.logout.matchFulfilled(action) ||
            api.endpoints.deleteAccount.matchFulfilled(action)) &&
        state !== undefined
    ) {
        state = { ...state, auth: authSlice.getInitialState(), userRecipes: userRecipesSlice.getInitialState() };
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
