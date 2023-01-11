import { NextFunction } from 'express';
import TokensService from '../../services/tokens';
import { TokenPayload } from '../../types/tokens';
import logger from '../../utils/logger';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenCookies } from './types';

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

    async function errorsHandler(
        req: Server.Request,
        res: Server.Response,
        callback: (req: Server.Request, res: Server.Response) => Promise<unknown>
    ) {
        try {
            await callback(req, res);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ error: 'Token has expired' });
            }

            if (err instanceof JsonWebTokenError) {
                return res.status(400).json({ error: err.message });
            }

            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while validating the token' });
        }
    }

    export function verifyAcessToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        errorsHandler(req, res, async () => {
            const payload = await verifyToken(req, res);

            if (payload === null) {
                return;
            }

            req.userId = payload.userId;

            next();
        });
    }

    export function verifyRefreshToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        async function handler() {
            try {
                const cookies = req.cookies as RefreshTokenCookies;
                const refreshTokenString = cookies.refreshToken;

                if (!refreshTokenString) {
                    return res.status(400).json({ error: "Refresh token was't provided" });
                }

                const refreshToken = await TokensService.getRefreshToken(refreshTokenString);

                if (refreshToken === null) {
                    return res.status(400).json({ error: 'Invalid token' });
                }

                const isTokenValid = TokensService.verifyRefreshToken(refreshToken);

                if (!isTokenValid) {
                    return res.status(400).json({ error: 'Token has expired' });
                }

                const user = await TokensService.getRefreshTokenOwner(refreshToken);

                if (!user) {
                    return res.status(404).json({ error: 'The user who owns the token was not found' });
                }

                req.userId = user.id;

                next();
            } catch (err) {
                logger.log(err);
                res.status(500).json({ error: 'An unexpected error occurred while validating the token' });
            }
        }

        handler();
    }
}

export default TokensMiddleware;
