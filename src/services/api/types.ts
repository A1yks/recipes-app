import { LoginReq, RegisterReq } from '@backend/controllers/auth/types';
import { RecipeAttrs } from '@backend/models/Recipe';
import { UserAttrs } from '@backend/models/User';
import { User } from 'src/store/reducers/auth';

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
