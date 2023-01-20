import UserService from '../user';
import bcrypt from 'bcrypt';
import TokensService from '../tokens';
import User from '@backend/models/User';
import db from '@backend/db';
import { UserCreationData } from './types';

namespace AuthService {
    /**
     * Attempts to log in a user with a given password
     * @param user The user to log in
     * @param plaintextPassword The plaintext password to check
     * @returns An object containing access and refresh tokens, or `null` if the login failed.
     */
    export async function login(user: User, plaintextPassword: string) {
        const passwordsMatch = await bcrypt.compare(plaintextPassword, user.password);

        if (passwordsMatch) {
            return await TokensService.issueTokens(user.id);
        }

        return null;
    }

    /**
     * Registers a new user with the given data
     * @param userData User registration data
     * @returns The new user, access and refresh tokens, or null if the user already exists
     */
    export async function register(userData: UserCreationData) {
        const userExists = await UserService.userExists(userData.login);

        if (userExists) {
            return null;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        userData.password = hashedPassword;

        return await db.transaction(async () => {
            const user = await UserService.createUser(userData);
            const tokens = await TokensService.issueTokens(user.id);
            const userInfo = await UserService.getUserInfo(user);

            return { user: userInfo, tokens };
        });
    }
}

export default AuthService;
