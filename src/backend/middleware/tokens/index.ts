import { NextFunction } from 'express';
import TokensService from '../../services/tokens';
import { TokenPayload } from '../../types/tokens';
import logger from '../../utils/logger';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenCookies } from './types';
import errorsHandler from '@backend/utils/errorsHander';
import { ErrorTypes } from '@backend/types/errors';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';

namespace TokensMiddleware {
    function extractAcessToken(req: Server.Request) {
        const authHeader = req.headers.authorization;
        const matched = authHeader?.match(/Bearer\s+(.+)$/);

        if (!matched || !matched[1]) {
            return null;
        }

        return matched[1];
    }

    async function verifyToken(req: Server.Request, res: Server.Response) {
        const token = extractAcessToken(req);

        if (token === null) {
            res.status(403).json({ error: 'Authorization token is missing' });

            return null;
        }

        const payload = (await TokensService.verifyToken(token)) as TokenPayload;

        return payload;
    }

    export async function verifyAcessToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        try {
            const payload = await verifyToken(req, res);

            if (payload === null) {
                return;
            }

            req.userId = payload.userId;

            next();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occurred while validating the token',
                expectedErrors: [
                    [TokenExpiredError, 401],
                    [JsonWebTokenError, 400],
                ],
            });
        }
    }

    export async function verifyRefreshToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        try {
            const cookies = req.cookies as RefreshTokenCookies;
            const refreshTokenString = cookies.refreshToken;
            console.log(refreshTokenString);

            if (!refreshTokenString) {
                return res.status(400).json({ error: "Refresh token was't provided" });
            }

            const refreshToken = await TokensService.getRefreshToken(refreshTokenString);

            if (refreshToken === null) {
                return res.status(400).json({ error: 'Invalid token' });
            }

            const isTokenValid = TokensService.verifyRefreshToken(refreshToken);

            if (!isTokenValid) {
                await TokensService.deleteRefreshToken(refreshToken);
                setRefreshTokenCookie(res, refreshTokenString, true);

                return res.status(400).json({ error: 'Token has expired' });
            }

            const user = await TokensService.getRefreshTokenOwner(refreshToken);

            if (!user) {
                return res.status(404).json({ error: 'The user who owns the token was not found' });
            }

            req.userId = user.id;

            next();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occurred while validating the token',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default TokensMiddleware;
