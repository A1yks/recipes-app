import User, { UserAttrs } from 'backend/models/User';

namespace UserService {
    export async function userExists(login: string) {
        const user = await User.findOne({ where: { login } });

        return user !== null;
    }

    export async function createUser(userData: UserAttrs) {
        const user = await User.create(userData);

        return user;
    }

    export async function getUser(userData: Partial<UserAttrs>) {
        return await User.findOne({ where: userData });
    }
}

export default UserService;
