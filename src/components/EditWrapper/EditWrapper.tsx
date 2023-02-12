import { Grid, Tooltip } from '@mui/material';
import useCanEdit from 'src/hooks/useCanEdit';
import EditIcon from '../EditIcon';
import { EditWrapperProps } from './EditWrapper.types';

function EditWrapper(props: EditWrapperProps) {
    const canEdit = useCanEdit();

    const editJsx = (
        <Grid item sx={{ position: { xl: 'absolute' }, left: -40 }}>
            {canEdit && (
                <Tooltip title={props.editIconTooltipText || 'Edit'}>
                    <div>
                        <EditIcon onClick={props.onEditIconClick} sx={props.editIconSx} />
                    </div>
                </Tooltip>
            )}
        </Grid>
    );

    return (
        <Grid container alignItems="center" gap={1.5} sx={props.sx} position="relative">
            {editJsx}
            <Grid item>{props.children}</Grid>
        </Grid>
    );
}

export default EditWrapper;
