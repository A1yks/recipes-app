import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ElementType } from 'react';
import ControlledInput from '../ControlledInput';
import EditWrapper from '../EditWrapper';
import LoadingButton from '../LoadingButton';
import { EditableTextProps } from './EditableText.types';
import useEditableText from './hooks/useEditableText';

function EditableText<T extends ElementType = 'span'>(props: EditableTextProps<T>) {
    const {
        control,
        edit,
        inputText,
        inputChangeHandler,
        inputFocusHandler,
        editIconClickHandler,
        saveHandler,
        cancelHandler,
    } = useEditableText(props);

    if (!edit) {
        return (
            <EditWrapper onEditIconClick={editIconClickHandler} {...props.editWrapperProps}>
                <Typography {...props.typographyProps}>{inputText}</Typography>
            </EditWrapper>
        );
    }

    return (
        <Grid container direction="column" sx={props.inputContainerSx} component="form" onSubmit={saveHandler}>
            <Grid item>
                <ControlledInput
                    control={control}
                    value={inputText}
                    onChange={inputChangeHandler}
                    fullWidth
                    autoFocus
                    onFocus={inputFocusHandler}
                    disabled={props.isSaving}
                    {...props.inputProps}
                />
            </Grid>
            <Grid container item mt={1} gap={3} justifyContent="flex-end">
                <Grid item>
                    <Button variant="contained" color="error" disabled={props.isSaving} onClick={cancelHandler}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <LoadingButton variant="contained" type="submit" loading={props.isSaving}>
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EditableText;
