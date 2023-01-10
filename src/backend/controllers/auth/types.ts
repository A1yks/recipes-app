import { UserAttrs } from 'backend/models/User';

export type LoginReq = Pick<UserAttrs, 'login' | 'password'>;

export type RegisterReq = UserAttrs;
