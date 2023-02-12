import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

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

        type WithChildren = {
            children: ReactNode;
        };
    }

    interface Window {
        lastHref?: string;
    }
}

export {};
