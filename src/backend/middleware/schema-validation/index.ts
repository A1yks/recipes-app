import { NextFunction } from 'express';
import Joi from 'joi';
import { ValidationConfig } from './types';

namespace ValidationMiddleware {
    export function validate(
        schema: Joi.Schema,
        config: ValidationConfig = { validateBody: true, validateParams: false, validateQuery: false }
    ) {
        return function (req: Server.Request, res: Server.Response, next: NextFunction) {
            const { error, value } = schema.validate(
                config.validateBody
                    ? req.body
                    : config.validateParams
                    ? req.params
                    : config.validateQuery
                    ? req.query
                    : req.body
            );

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            next();
        };
    }
}

export default ValidationMiddleware;
