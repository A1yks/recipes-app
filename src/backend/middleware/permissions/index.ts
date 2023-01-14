import { UserAttrs } from 'backend/models/User';
import { ErrorTypes } from 'backend/types/errors';
import errorsHandler from 'backend/utils/errorsHander';
import { NextFunction } from 'express';

type ValidationCallback = (userId: UserAttrs['id'], req: Server.Request) => boolean | Promise<boolean>;

namespace PermissionsMiddleware {
    export function check(callback: ValidationCallback) {
        return function (req: Server.Request, res: Server.Response, next: NextFunction) {
            async function handler() {
                const userId = req.userId;

                if (userId === undefined) {
                    return res.status(401).json({ error: 'Provided access token is invalid' });
                }

                try {
                    const result = await callback(userId, req);

                    if (result) {
                        next();
                    } else {
                        res.status(403).json({ error: "You don't have permissions do perform this operation" });
                    }
                } catch (err) {
                    errorsHandler(err, {
                        res,
                        unexpectedErrMsg: 'An unexpected error occured while checking user permissions',
                        expectedErrors: [[ErrorTypes.NO_PERMISSIONS, 404]],
                    });
                }
            }

            handler();
        };
    }
}

export default PermissionsMiddleware;
