import { ReactNode } from 'react';
import { DialogProps as MuiDialogProps } from '@mui/material';

export type DialogProps = {
    isOpened: boolean;
    title: string;
    contentText?: string;
    content?: JSX.Element;
    actions: ReactNode;
    onClose?: () => void;
    dialogProps?: Partial<MuiDialogProps>;
};
