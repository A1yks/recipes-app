import AuthService from '@backend/services/auth';
import UserService from '@backend/services/user';
import logger from '@backend/utils/logger';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';
import { LoginReq, RegisterReq } from './types';

namespace AuthController {
    export async function login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { login, password } = req.body;

        try {
            const user = await UserService.getUser({ login });

            if (user === null) {
                return res.status(404).json({ error: "User with provided login doesn't exist" });
            }

            const tokens = await AuthService.login(user, password);

            if (tokens === null) {
                return res.status(401).json({ error: "Login and/or password doesn't match" });
            }

            const userInfo = await UserService.getUserInfo({ userId: user.id });

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { user: { login, ...userInfo?.toJSON() }, accessToken: tokens.accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'An unexpected error occurred while trying to logging into account' });
        }
    }

    export async function register(req: Server.Request<RegisterReq>, res: Server.Response) {
        try {
            const { login } = req.body;
            const data = await AuthService.register(req.body);

            if (data === null) {
                return res.status(400).json({ error: 'User with provided login already exists' });
            }

            const { user, tokens } = data;

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { user: { login, ...user?.toJSON() }, accessToken: tokens.accessToken } });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while creating a new user' });
        }
    }
}

export default AuthController;
