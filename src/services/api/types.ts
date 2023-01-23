import { LoginReq, RegisterReq } from '@backend/controllers/auth/types';
import { UserAttrs } from '@backend/models/User';

type LoginData = { type: 'login' } & LoginReq;
type RegisterData = { type: 'register' } & RegisterReq;

export type AuthReq = LoginData | RegisterData;

export type AuthRes = {
    user: Omit<UserAttrs, 'password'>;
    accessToken: string;
    cookie?: string;
};
