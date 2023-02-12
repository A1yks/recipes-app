import { Box, Grid, Container } from '@mui/material';
import PageTitle from 'src/components/PageTitle';
import { ContentLayoutProps } from './ContentLayout.types';

function ContentLayout(props: ContentLayoutProps) {
    return (
        <Grid container component={Container} wrap="nowrap" direction="column" sx={{ height: '100%', ...props.sx }}>
            {props.title !== undefined && <PageTitle title={props.title} sx={props.pageTitleSx} />}
            <Grid
                item
                component={Box}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: { md: 8, xs: 4 },
                    flex: 1,
                    ...props.childrenWrapperSx,
                }}
            >
                {props.children}
            </Grid>
        </Grid>
    );
}

export default ContentLayout;
