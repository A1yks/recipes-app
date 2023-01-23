import User from '@backend/models/User';
import UserInfo from '@backend/models/UserInfo';

export type UserCreationData = {
    login: User['login'];
    password: User['password'];
    name: UserInfo['name'];
    surname: UserInfo['surname'];
};
