import { Grid, CircularProgress } from '@mui/material';

function PageLoader() {
    return (
        <Grid container justifyContent="center" alignItems="center" height="100%">
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );
}

export default PageLoader;
