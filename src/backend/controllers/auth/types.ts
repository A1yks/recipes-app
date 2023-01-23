import { UserAttrs } from '@backend/models/User';
import { UserInfoAttrs } from '@backend/models/UserInfo';

export type LoginReq = Pick<UserAttrs, 'login' | 'password'>;

export type RegisterReq = LoginReq & Pick<UserInfoAttrs, 'name' | 'surname'>;
