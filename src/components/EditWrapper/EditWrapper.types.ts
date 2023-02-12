import { SxProps } from '@mui/material';

export type EditWrapperProps = Props.WithSx &
    Props.WithChildren & {
        editIconSx?: SxProps;
        editIconTooltipText?: string;
        onEditIconClick?: () => void;
    };
