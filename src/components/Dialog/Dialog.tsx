import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DialogProps } from './Dialog.types';

function Dialog(props: DialogProps) {
    const isContentPresent = props.content !== undefined || props.contentText !== undefined;

    return (
        <MuiDialog open={props.isOpened} onClose={props.onClose} {...props.dialogProps}>
            <DialogTitle>{props.title}</DialogTitle>
            {isContentPresent && (
                <DialogContent>
                    {props.contentText !== undefined && <DialogContentText>{props.contentText}</DialogContentText>}
                    {props.content}
                </DialogContent>
            )}

            <DialogActions>{props.actions}</DialogActions>
        </MuiDialog>
    );
}

export default Dialog;
