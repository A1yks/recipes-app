import RefreshToken, { RefreshTokenAttrs } from '@backend/models/RefreshToken';
import User, { UserAttrs } from '@backend/models/User';
import { ErrorTypes } from '@backend/types/errors';
import jwt from 'jsonwebtoken';

namespace TokensService {
    export const expiresIn = 60 * 60 * 3; // in seconds

    export async function issueAccessToken(userId: UserAttrs['id']) {
        return new Promise<string>((resolve, reject) => {
            jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else if (token === undefined) {
                    reject("Token wasn't created");
                } else {
                    resolve(token);
                }
            });
        });
    }

    export async function issueTokens(userId: UserAttrs['id'], refreshTokenStr?: string) {
        const accessTokenPromise = issueAccessToken(userId);
        const refreshTokenPromise = RefreshToken.issueToken(userId, refreshTokenStr);

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

        return { accessToken, refreshToken };
    }

    export async function verifyToken(token: string) {
        return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenPayload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tokenPayload);
                }
            });
        });
    }

    export async function getRefreshToken(refreshTokenString: RefreshToken['token']) {
        return await RefreshToken.findOne({ where: { token: refreshTokenString } });
    }

    export async function getRefreshTokenOwner(refreshToken: RefreshToken) {
        return await refreshToken.getUser();
    }

    export function verifyRefreshToken(refreshToken: RefreshToken) {
        return RefreshToken.verifyToken(refreshToken);
    }

    export async function deleteRefreshToken(refreshTokenDataOrInstance: RefreshToken | Partial<RefreshTokenAttrs>) {
        let refreshToken: RefreshToken | null = null;

        if (refreshTokenDataOrInstance instanceof RefreshToken) {
            refreshToken = refreshTokenDataOrInstance;
        } else {
            refreshToken = await RefreshToken.findOne({ where: refreshTokenDataOrInstance });
        }

        if (refreshToken === null) {
            throw new Error('Provided refresh token does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        await refreshToken.destroy();
    }
}

export default TokensService;
