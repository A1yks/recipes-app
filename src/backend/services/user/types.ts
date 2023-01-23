import User from '@backend/models/User';

export type UserCreationData = {
    login: User['login'];
    password: User['password'];
    name: User['name'];
    surname: User['surname'];
};
