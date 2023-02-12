import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { SvgIconProps } from '@mui/material';

function EditIcon(props: SvgIconProps) {
    const { className, sx, ...restProps } = props;

    return (
        <ModeEditOutlineOutlinedIcon
            sx={{ cursor: 'pointer', ...sx }}
            className={`hover-color-primary ${className}`}
            {...restProps}
        />
    );
}

export default EditIcon;
