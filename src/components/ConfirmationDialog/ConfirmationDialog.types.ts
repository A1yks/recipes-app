import { DialogProps } from 'src/components/Dialog/Dialog.types';

export type ConfirmationDialogProps = Omit<DialogProps, 'actions'> & {
    isLoading?: boolean;
    submitBtnText?: string;
    cancelBtnText?: string;
    onSubmit?: () => MaybePromise<void>;
    onCancel?: () => MaybePromise<void>;
    actions?: DialogProps['actions'];
};
