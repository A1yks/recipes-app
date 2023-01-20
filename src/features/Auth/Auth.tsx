import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField, Typography, Link } from '@mui/material';
import FullHeightContainer from 'components/FullHeightContainer';
import Image from 'next/image';
import { AuthProps } from './Auth.types';
import useAuth from './hooks/useAuth';

function Auth(props: AuthProps) {
    const { isLoading, isLoginForm, formText, autoComplete, formState, authHandler, changeHandler } = useAuth(props);

    return (
        <FullHeightContainer maxWidth="sm">
            <Box component="form" sx={{ height: '100%' }}>
                <Grid container height="100%" alignItems="center" justifyContent="center">
                    <Grid container width="75%" item direction="column" alignItems="center" paddingY={2}>
                        <Grid item width="100%" height={50} sx={{ position: 'relative' }} mb={4}>
                            <Link href="/">
                                <Image src="/images/logo.svg" fill alt="" />
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography component="h1" variant="h6" textAlign="center" fontWeight={400}>
                                {formText}
                            </Typography>
                        </Grid>
                        <Grid container item rowGap={2} direction="column" mt={3}>
                            <Grid item>
                                <TextField
                                    autoComplete={autoComplete}
                                    placeholder="Login"
                                    fullWidth
                                    value={formState.login}
                                    onChange={changeHandler('login')}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    autoComplete={autoComplete}
                                    placeholder="Password"
                                    type="password"
                                    fullWidth
                                    value={formState.password}
                                    onChange={changeHandler('password')}
                                />
                            </Grid>
                            {!isLoginForm && (
                                <>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            placeholder="Name"
                                            value={formState.name}
                                            onChange={changeHandler('name')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            placeholder="Surname"
                                            value={formState.surname}
                                            onChange={changeHandler('surname')}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <Grid item width="100%" mt={3}>
                            <LoadingButton loading={isLoading} variant="contained" fullWidth onClick={authHandler}>
                                {formText}
                            </LoadingButton>
                            <Typography component="p" textAlign="center" mt={2}>
                                {isLoginForm ? (
                                    <>
                                        Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
                                    </>
                                ) : (
                                    <>
                                        Already have an account? <Link href="/auth/login">Sign in</Link>
                                    </>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FullHeightContainer>
    );
}

export default Auth;
