import RefreshToken from 'backend/models/RefreshToken';
import { UserAttrs } from 'backend/models/User';
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

    export async function issueTokens(userId: UserAttrs['id']) {
        const accessTokenPromise = issueAccessToken(userId);
        const refreshTokenPromise = RefreshToken.issueToken(userId);

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
}

export default TokensService;