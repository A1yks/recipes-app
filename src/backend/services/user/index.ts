import { USER_AVATARS_FOLDER_PATH } from '@backend/controllers/user';
import User, { UserAttrs } from '@backend/models/User';
import { ErrorTypes } from '@backend/types/errors';
import path from 'path';
import FileUploaderService from '../fileUploader';
import { UserCreationData, UserEditingData } from './types';
import bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';
import AuthService from '../auth';

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

    export async function editData(userData: UserEditingData, userIdOrUserInstabce: User['id'] | User) {
        let user: User;

        if (userIdOrUserInstabce instanceof User) {
            user = userIdOrUserInstabce;
        } else {
            user = await getUserWithErrorCheck(userIdOrUserInstabce);
        }

        if (userData.password !== undefined) {
            userData.password = await AuthService.hashPassword(userData.password);
        }

        if (userData.avatar !== undefined && user.avatar !== null) {
            await deleteAvatarFile(user.avatar);
        }

        try {
            await user.update(userData);

            return await getUser({ id: user.id });
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                throw new Error('User with provided login already exists', { cause: ErrorTypes.ALREADY_EXISTS });
            }

            throw err;
        }
    }

    export async function deleteAvatar(userId: User['id']) {
        const user = await getUserWithErrorCheck(userId);
        const avatar = user.avatar;

        if (avatar === null) {
            throw new Error('User does not have an avatar', { cause: ErrorTypes.NOT_FOUND });
        }

        await user.update({ avatar: null });
        await deleteAvatarFile(avatar);
    }

    export async function deleteUser(userId: User['id'], password: User['password']) {
        const user = await getUserWithErrorCheck(userId, true);
        const passwordsMatch = await checkUserPassword(user, password);

        if (!passwordsMatch) {
            throw new Error('Password is incorrect', { cause: ErrorTypes.BAD_DATA });
        }

        if (user.avatar !== null) {
            await deleteAvatarFile(user.avatar);
        }

        await user.destroy();
    }

    export async function checkUserPassword(user: User, plaintextPassword: User['password']) {
        return await bcrypt.compare(plaintextPassword, user.password);
    }

    async function getUserWithErrorCheck(userId: User['id'], withPassword = false) {
        const user = await getUser({ id: userId }, withPassword);

        if (user === null) {
            throw new Error('User with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        return user;
    }

    async function deleteAvatarFile(fileName: string) {
        await FileUploaderService.deleteFileFromDisk(path.join(USER_AVATARS_FOLDER_PATH, fileName));
    }
}

export default UserService;
