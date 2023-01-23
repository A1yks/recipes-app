import { RefreshTokenCookies } from '@backend/middleware/tokens/types';
import TokensService from '@backend/services/tokens';
import UserService from '@backend/services/user';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';

namespace TokensController {
    export function sendVerifiedResponse(req: Server.Request, res: Server.Response) {
        res.status(204).send();
    }

    export async function renewAccessToken(req: Server.Request, res: Server.Response) {
        if (!req.userId) {
            return res.status(401).json({ error: 'User is not defined' });
        }

        const cookies = req.cookies as RefreshTokenCookies;

        try {
            const [{ accessToken, refreshToken }, user] = await Promise.all([
                await TokensService.issueTokens(req.userId, cookies.refreshToken),
                await UserService.getUser({ id: req.userId }),
            ]);

            setRefreshTokenCookie(res, refreshToken);
            res.status(201).json({ data: { user, accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'An unexpected error occurred while issuing new tokens' });
        }
    }
}

export default TokensController;
