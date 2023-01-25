import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from 'src/components/Dialog';
import LoadingButton from 'src/components/LoadingButton';
import UserAvatar from 'src/components/UserAvatar';
import useAvatarSettings from './hooks/useAvatarSettings';

function AvatarSettings(props: Props.WithSx) {
    const {
        isAvatarUploaded,
        isUploading,
        isDeleting,
        isDeleteAvatarDialogOpened,
        chooseAvatarHandler,
        deleteAvatarHandler,
        openDeleteAvatarDialogHandler,
        closeDeleteAvatarDialogHandler,
    } = useAvatarSettings();
    const avatarSize = 100;
    const isDisabled = isDeleting || isUploading;

    return (
        <Grid container sx={props.sx} alignItems="center">
            <Grid item>
                <UserAvatar size={avatarSize} />
            </Grid>
            <Grid item ml={3}>
                <LoadingButton
                    variant="contained"
                    onClick={chooseAvatarHandler}
                    loading={isUploading}
                    disabled={isDisabled}
                    sx={{ width: '10rem' }}
                >
                    {isAvatarUploaded ? 'Change photo' : 'Upload photo'}
                </LoadingButton>
            </Grid>
            {isAvatarUploaded && (
                <Grid item ml={3}>
                    <Button variant="black" onClick={openDeleteAvatarDialogHandler} disabled={isDisabled}>
                        Delete photo
                    </Button>
                </Grid>
            )}
            <Dialog
                isOpened={isDeleteAvatarDialogOpened}
                title="Delete avatar"
                contentText="Do you really want to delete your avatar?"
                onClose={closeDeleteAvatarDialogHandler}
                actions={
                    <>
                        <LoadingButton onClick={deleteAvatarHandler} loading={isDeleting}>
                            Yes
                        </LoadingButton>
                        <Button onClick={closeDeleteAvatarDialogHandler}>No</Button>
                    </>
                }
            />
        </Grid>
    );
}

export default AvatarSettings;
