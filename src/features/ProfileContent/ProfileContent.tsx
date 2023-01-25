import { Divider, Typography, Grid, Box, Container } from '@mui/material';
import AccountActions from './AccountActions';
import AvatarSettings from './AvatarSettings';
import FieldsSettings from './FieldsSettings';

function ProfileContent() {
    return (
        <Container>
            <Typography variant="h4">Profile</Typography>
            <Divider sx={{ mt: 3 }} />
            <Box sx={{ width: '70%', mt: 8 }}>
                <Grid container direction="column">
                    <Grid item>
                        <AvatarSettings />
                    </Grid>
                    <Grid item>
                        <FieldsSettings />
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 6 }} />
                <AccountActions sx={{ mt: 4, pb: 4 }} />
            </Box>
        </Container>
    );
}

export default ProfileContent;
