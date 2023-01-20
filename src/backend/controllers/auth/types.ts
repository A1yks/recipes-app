import { UserAttrs } from '@backend/models/User';
import { UserInfoAttrs } from '@backend/models/UserInfo';

export type LoginReq = Pick<UserAttrs, 'login' | 'password'>;

export type RegisterReq = LoginReq & Partial<Pick<UserInfoAttrs, 'name' | 'surname'>>;
