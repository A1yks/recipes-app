import User, { UserAttrs } from '@backend/models/User';
import UserInfo, { UserInfoAttrs } from '@backend/models/UserInfo';
import { WhereOptions } from 'sequelize';
import { UserCreationData } from './types';

namespace UserService {
    export async function userExists(login: string) {
        const user = await User.findOne({ where: { login } });

        return user !== null;
    }

    export async function createUser(userData: UserCreationData) {
        const { login, password, ...userInfoData } = userData;
        const user = await User.create({ login, password });

        await user.createInfo(userInfoData);

        return user;
    }

    export async function getUser(userData: Partial<UserAttrs>) {
        return await User.findOne({ where: userData });
    }

    export async function getUserInfo(userInfoDataOrUserInstance: User | Partial<UserInfoAttrs>, include = false) {
        let whereOptions: WhereOptions<UserInfo> = {};

        if (userInfoDataOrUserInstance instanceof User) {
            whereOptions.id = userInfoDataOrUserInstance.id;
        } else {
            whereOptions = userInfoDataOrUserInstance;
        }

        return await UserInfo.findOne({
            where: whereOptions,
            attributes: {
                exclude: ['userId'],
            },
            include: include ? { model: User, as: 'user' } : undefined,
        });
    }
}

export default UserService;
