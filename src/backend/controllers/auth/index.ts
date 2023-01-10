import AuthService from 'backend/services/auth';
import UserService from 'backend/services/user';
import logger from 'backend/utils/logger';
import setRefreshTokenCookie from 'backend/utils/setRefreshTokenCookie';
import { LoginReq, RegisterReq } from './types';

namespace AuthController {
    export async function login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { login, password } = req.body;

        try {
            const user = await UserService.getUser({ login });

            if (user === null) {
                return res.status(404).json({ error: "The user with this login doesn't exist" });
            }
        } catch (err) {}
    }

    export async function register(req: Server.Request<RegisterReq>, res: Server.Response) {
        try {
            const data = await AuthService.register(req.body);

            if (data === null) {
                return res.status(400).json({ error: 'User with provided login already exists' });
            }

            const { user, tokens } = data;

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { user, accessToken: tokens.accessToken } });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while creating a new user' });
        }
    }
}

export default AuthController;