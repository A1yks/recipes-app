import { Divider, Typography, Grid, Box, Container } from '@mui/material';
import AccountActions from './AccountActions';
import AvatarSettings from './AvatarSettings';
import FieldsSettings from './FieldsSettings';

function ProfileContent() {
    return (
        <Container>
            <Typography variant="h4">Profile</Typography>
            <Divider sx={{ mt: 3 }} />
            <Grid container md={8} sm sx={{ mt: { md: 8, xs: 4 } }}>
                <Grid container item direction="column">
                    <Grid item>
                        <AvatarSettings />
                    </Grid>
                    <Grid item>
                        <FieldsSettings />
                    </Grid>
                    <Divider sx={{ mt: 6 }} />
                </Grid>

                <AccountActions sx={{ mt: 4, pb: 4 }} />
            </Grid>
        </Container>
    );
}

export default ProfileContent;
