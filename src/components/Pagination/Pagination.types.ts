import { PaginationProps as MuiPaginationProps } from '@mui/material';

export type PaginationProps = MuiPaginationProps & {
    hrefPattern?: string;
    queries?: boolean;
};
