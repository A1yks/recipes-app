import { SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { PageTitleProps } from 'src/components/PageTitle/PageTitle.types';

export type ContentLayoutProps = Props.WithSx & {
    title?: PageTitleProps['title'];
    pageTitleSx?: PageTitleProps['sx'];
    childrenWrapperSx?: SxProps;
    children: ReactNode;
};
