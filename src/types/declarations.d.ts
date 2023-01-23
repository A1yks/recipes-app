import { SxProps } from '@mui/material';

declare global {
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

    declare namespace Pages {
        interface InitialPropsResult {
            protected?: boolean;
            [x: string]: unknown;
        }
    }
}

export {};
