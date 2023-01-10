import User, { UserAttrs } from 'backend/models/User';
import UserInfo, { UserInfoAttrs } from 'backend/models/UserInfo';

namespace UserService {
    export async function userExists(login: string) {
        const user = await User.findOne({ where: { login } });

        return user !== null;
    }

    export async function createUser(userData: UserAttrs & Partial<UserInfoAttrs>) {
        const { login, password, ...userInfoData } = userData;
        const user = await User.create({ login, password });

        await user.createInfo(userInfoData);

        return user;
    }

    export async function getUser(userData: Partial<UserAttrs>) {
        return await User.findOne({ where: userData });
    }

    export async function getUserInfo(userInfoDataOrUserInstance: User | Partial<UserInfoAttrs>, include = false) {
        if (userInfoDataOrUserInstance instanceof User) {
            return await userInfoDataOrUserInstance.getInfo();
        }

        return await UserInfo.findOne({
            where: userInfoDataOrUserInstance,
            include: include ? { model: User, as: 'user' } : undefined,
        });
    }
}

export default UserService;
