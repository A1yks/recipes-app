import { Box, Divider, Typography } from '@mui/material';
import { PageTitleProps } from './PageTitle.types';

function PageTitle(props: PageTitleProps) {
    return (
        <Box sx={props.sx}>
            <Typography variant="h4">{props.title}</Typography>
            <Divider sx={{ mt: 3 }} />
        </Box>
    );
}

export default PageTitle;
