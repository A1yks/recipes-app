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
        <Grid
            container
            alignItems="center"
            sx={{
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                },
                ...props.sx,
            }}
        >
            <Grid item>
                <UserAvatar size={avatarSize} />
            </Grid>
            <Grid
                container
                item
                width="auto"
                sx={{
                    mt: { xs: 3, sm: 0 },
                    '& button': {
                        width: {
                            xs: '10rem',
                            sm: 'auto',
                        },
                    },
                    justifyContent: {
                        xs: 'center',
                        sm: 'initial',
                    },
                    gap: 3,
                }}
            >
                <Grid item sx={{ ml: { sm: 3 } }}>
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
                    <Grid item>
                        <Button variant="black" onClick={openDeleteAvatarDialogHandler} disabled={isDisabled}>
                            Delete photo
                        </Button>
                    </Grid>
                )}
            </Grid>
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
