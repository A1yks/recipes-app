import { UserAttrs } from '@backend/models/User';

export type UserCreationData = {
    login: UserAttrs['login'];
    password: UserAttrs['password'];
    name: UserAttrs['name'];
    surname: UserAttrs['surname'];
};

export type UserEditingData = Partial<Omit<UserAttrs, 'id'>>;
