import { RefreshTokenCookies } from '@backend/middleware/tokens/types';
import AuthService from '@backend/services/auth';
import UserService from '@backend/services/user';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import logger from '@backend/utils/logger';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';
import { Ref } from 'react';
import { LoginReq, RegisterReq } from './types';

namespace AuthController {
    export async function login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { login, password } = req.body;

        try {
            const { refreshToken } = req.cookies as Partial<RefreshTokenCookies>;
            const user = await UserService.getUser({ login }, true);

            if (user === null) {
                return res.status(404).json({ error: "User with provided login doesn't exist" });
            }

            const tokens = await AuthService.login(user, password, refreshToken);

            if (tokens === null) {
                return res.status(401).json({ error: "Login and/or password doesn't match" });
            }

            const userInfo = await UserService.getUser({ id: user.id });

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { user: userInfo, accessToken: tokens.accessToken } });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while trying to logging into account' });
        }
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

    export async function logout(req: Server.Request, res: Server.Response) {
        try {
            const { refreshToken } = req.cookies as Partial<RefreshTokenCookies>;

            await AuthService.logout(req.userId!);

            if (refreshToken !== undefined) {
                setRefreshTokenCookie(res, refreshToken, true);
            }

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while logging out from the account',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default AuthController;
