import { SxProps } from '@mui/material';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    declare namespace API {
        type Response<T = unknown> = {
            data: T;
        };

        type ErrorResponse = {
            error: string;
        };
    }

    declare namespace Props {
        type WithSx = {
            sx?: SxProps;
        };
    }
}

export {};
