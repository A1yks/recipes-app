import { LoginReq, RegisterReq } from '@backend/controllers/auth/types';
import { UserInfoAttrs } from '@backend/models/UserInfo';

type LoginData = { type: 'login' } & LoginReq;
type RegisterData = { type: 'register' } & RegisterReq;

export type AuthReq = LoginData | RegisterData;

export type AuthRes = {
    user: Omit<UserInfoAttrs, 'userId'> & { login: string };
    accessToken: string;
};
