import User, { UserAttrs } from '@backend/models/User';
import { UserCreationData } from './types';

namespace UserService {
    export async function userExists(login: string) {
        const user = await User.findOne({ where: { login } });

        return user !== null;
    }

    export async function createUser(userData: UserCreationData) {
        return await User.create(userData);
    }

    export async function getUser(userData: Partial<UserAttrs>, withPassword = false) {
        if (withPassword) {
            return await User.scope('withPassword').findOne({ where: userData });
        }

        return await User.findOne({ where: userData });
    }
}

export default UserService;
