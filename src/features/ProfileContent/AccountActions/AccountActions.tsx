import { Button, Grid } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
import LogoutIcon from '@mui/icons-material/Logout';
import useAccountActions from './hooks/useAccountActions';
import Dialog from 'src/components/Dialog';
import ControlledInput from 'src/components/ControlledInput';

function AccountActions(props: Props.WithSx) {
    const {
        control,
        isLoggingOut,
        isDeletingAccount,
        isDeleteAccountDialogOpened,
        isSignOutDialogOpened,
        password,
        logoutHandler,
        deleteAccountSubmitHandler,
        openDeleteAccountDialogHandler,
        openSignOutDialogHandler,
        closeDeleteAccountDialogHandler,
        closeSignOutDialogHandler,
        changePasswordHandler,
    } = useAccountActions();

    return (
        <Grid container sx={props.sx} justifyContent="space-between" gap={3}>
            <Grid item xs={12} sm="auto">
                <Button
                    variant="text"
                    sx={{ color: 'black', width: { xs: '100%', sm: 'auto' } }}
                    onClick={openSignOutDialogHandler}
                >
                    <LogoutIcon sx={{ mr: 1 }} />
                    Sign out
                </Button>
            </Grid>
            <Grid item xs={12} sm="auto">
                <Button
                    variant="text"
                    color="error"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                    onClick={openDeleteAccountDialogHandler}
                >
                    Delete account
                </Button>
            </Grid>
            <Dialog
                isOpened={isSignOutDialogOpened}
                onClose={closeSignOutDialogHandler}
                title="Sign out"
                contentText="Do you really want to sign out?"
                actions={
                    <>
                        <LoadingButton loading={isLoggingOut} onClick={logoutHandler}>
                            Yes
                        </LoadingButton>
                        <Button onClick={closeSignOutDialogHandler}>No</Button>
                    </>
                }
            />
            <Dialog
                isOpened={isDeleteAccountDialogOpened}
                dialogProps={{ maxWidth: 'sm', fullWidth: true }}
                onClose={closeDeleteAccountDialogHandler}
                title="Delete account"
                contentText="??onfirm your password to delete the account. Your recipes will not be deleted."
                content={
                    <form id="delete-account-form" onSubmit={deleteAccountSubmitHandler}>
                        <ControlledInput
                            name="password"
                            control={control}
                            type="password"
                            label="Password"
                            variant="standard"
                            value={password}
                            onChange={changePasswordHandler}
                            fullWidth
                            autoComplete="off"
                            autoFocus
                            sx={{ mt: 1 }}
                        />
                    </form>
                }
                actions={
                    <>
                        <LoadingButton
                            color="error"
                            type="submit"
                            form="delete-account-form"
                            loading={isDeletingAccount}
                        >
                            Ok
                        </LoadingButton>
                        <Button onClick={closeDeleteAccountDialogHandler}>Cancel</Button>
                    </>
                }
            />
        </Grid>
    );
}

export default AccountActions;
