import { LoginReq, RegisterReq } from '@backend/controllers/auth/types';
import { RecipeAttrs } from '@backend/models/Recipe';
import { UserAttrs } from '@backend/models/User';
import { User } from 'src/store/reducers/auth';
import { ClientRecipe } from 'src/store/reducers/userRecipes';

type LoginData = { type: 'login' } & LoginReq;
type RegisterData = { type: 'register' } & RegisterReq;

export type AuthReq = LoginData | RegisterData;

export type AuthRes = {
    user: Omit<UserAttrs, 'password'>;
    accessToken: string;
    cookie?: string;
};

export type GetUserRecipesRes = {
    count: number;
    recipes: RecipeAttrs[];
};

export type EditAccountDataRes = User;

export type GetRecipeRes = {
    recipe: ClientRecipe;
    userRating?: number;
};

export type RatingRes = {
    userRating: number;
    recipeRating: number;
};

export type DeleteRatingRes = {
    userRating: null;
    recipeRating: number;
};
