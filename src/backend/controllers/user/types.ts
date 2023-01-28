import { UserAttrs } from '@backend/models/User';

export type GetUserRecipesReq = {
    page?: number;
};

export type EditUserReq = Partial<Omit<UserAttrs, 'id' | 'avatar'>>;

export type DeleteUserReq = Pick<UserAttrs, 'password'>;
