import { Divider, Grid } from '@mui/material';
import ContentLayout from 'src/layouts/ContentLayout';
import AccountActions from './AccountActions';
import AvatarSettings from './AvatarSettings';
import FieldsSettings from './FieldsSettings';

function ProfileContent() {
    return (
        <ContentLayout title="Profile">
            <Grid container>
                <Grid container item md={8} sm>
                    <Grid container item direction="column">
                        <Grid item>
                            <AvatarSettings />
                        </Grid>
                        <Grid item>
                            <FieldsSettings />
                        </Grid>
                        <Divider sx={{ mt: 6 }} />
                    </Grid>
                    <AccountActions sx={{ mt: 4 }} />
                </Grid>
            </Grid>
        </ContentLayout>
    );
}

export default ProfileContent;
