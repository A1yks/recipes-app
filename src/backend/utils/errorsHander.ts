import { ErrorCause } from 'backend/types/errors';
import logger from './logger';

type Configuration = {
    /**
     * Expected error message. If not specified, `err.message` is used.
     *
     * Error is considered to be expected in two cases:
     * 1. If `configuration.cause` is specified and it equals to `err.cause`;
     * 2. If `configuration.cause` is not specified, but `ErrorCauses` enum contains `err.cause` value (except `ErrorCauses.UNKNOWN`).
     */
    expectedErrMsg?: string;
    /**
     * Unexpected error message.
     *
     * Error is considered to be unexpected in two cases:
     * 1. If `configuration.cause` is specified and it doesn't equal to `err.cause`;
     * 2. If `configuration.cause` is not specified and `ErrorCauses` enum doesn't contain the `err.cause` value.
     */
    unexpectedErrMsg?: string;
    /**
     * Expected error http status code. Default code is 500.
     */
    expectedErrStatusCode?: number;
    /**
     * Unexpected error http status code. Default code is 500.
     */
    unexpectedErrStatusCode?: number;
    /**
     * Common http status code for both types oi errors. Default code is 500.
     */
    statusCode?: number;
    /**
     * Error cause. Used to determine whether the error is expected or not.
     */
    cause?: ErrorCause;
    /**
     * Determines whether errors should be outputed to the logger.
     */
    log?: boolean;
    /**
     * Express's `res` object which is used to send errors to the client.
     */
    res: Server.Response;
};

const DEFAULT_ERR_MSG = 'An error occured while perfoming the operation';
const defaultConfig: Partial<Configuration> = {
    statusCode: 500,
    unexpectedErrMsg: DEFAULT_ERR_MSG,
    cause: ErrorCause.UNKNOWN,
    log: false,
};
const possibleErrorCauses = Object.values(ErrorCause).filter((cause) => cause !== ErrorCause.UNKNOWN);

/**
 * Handles errors
 * @param err Error to handle
 * @param configuration Configuration object
 */
function errorsHandler(err: unknown, configuration: Configuration) {
    const config = { ...defaultConfig, ...configuration } as Required<Configuration>;

    if (config.log) {
        logger.error(err);
    }

    if (err instanceof Error) {
        if (config.expectedErrMsg === undefined) {
            config.expectedErrMsg = err.message;
        }

        if (config.expectedErrStatusCode === undefined) {
            config.expectedErrStatusCode = config.statusCode;
        }

        if (config.unexpectedErrStatusCode === undefined) {
            config.unexpectedErrStatusCode = config.statusCode;
        }

        if (config.cause !== ErrorCause.UNKNOWN) {
            if (err.cause === config.cause) {
                config.res.status(config.expectedErrStatusCode).json({ error: config.expectedErrMsg });
            } else {
                config.res.status(config.unexpectedErrStatusCode).json({ error: config.unexpectedErrMsg });
            }

            return;
        }

        if (possibleErrorCauses.includes(err.cause as ErrorCause)) {
            config.res.status(config.expectedErrStatusCode).json({ error: config.expectedErrMsg });
        } else {
            config.res.status(config.unexpectedErrStatusCode).json({ error: config.unexpectedErrMsg });
        }
    }
}

export default errorsHandler;
