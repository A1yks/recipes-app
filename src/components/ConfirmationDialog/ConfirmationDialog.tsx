import { Button } from '@mui/material';
import Dialog from 'src/components/Dialog';
import LoadingButton from '../LoadingButton';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

function ConfirmationDialog(props: ConfirmationDialogProps) {
    const { submitBtnText, cancelBtnText, onSubmit, onCancel, isLoading, ...restProps } = props;

    async function cancelHandler() {
        await onCancel?.();
        props.onClose?.();
    }

    return (
        <Dialog
            {...restProps}
            actions={
                <>
                    <LoadingButton loading={isLoading} onClick={onSubmit}>
                        {submitBtnText || 'Yes'}
                    </LoadingButton>
                    <Button disabled={isLoading} onClick={cancelHandler}>
                        {cancelBtnText || 'Cancel'}
                    </Button>
                </>
            }
        />
    );
}

export default ConfirmationDialog;
