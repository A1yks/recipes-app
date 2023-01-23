import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography, Link } from '@mui/material';
import FullHeightContainer from 'src/components/FullHeightContainer';
import Image from 'next/image';
import { AuthProps } from './Auth.types';
import useAuth from './hooks/useAuth';
import ControlledInput from 'src/components/ControlledInput';
import styles from './Auth.module.scss';

function Auth(props: AuthProps) {
    const { isLoading, isLoginForm, formText, autoComplete, formState, control, submitHandler, changeHandler } =
        useAuth(props);

    return (
        <FullHeightContainer maxWidth="sm">
            <Box component="form" sx={{ height: '100%' }} onSubmit={submitHandler}>
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
                                <ControlledInput
                                    name="login"
                                    control={control}
                                    autoComplete={autoComplete}
                                    placeholder="Login"
                                    fullWidth
                                    value={formState.login}
                                    onChange={changeHandler('login')}
                                />
                            </Grid>
                            <Grid item>
                                <ControlledInput
                                    name="password"
                                    control={control}
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
                                        <ControlledInput
                                            name="name"
                                            control={control}
                                            fullWidth
                                            placeholder="Name"
                                            value={formState.name}
                                            onChange={changeHandler('name')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <ControlledInput
                                            name="surname"
                                            control={control}
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
                            <LoadingButton loading={isLoading} variant="contained" fullWidth type="submit">
                                {formText}
                            </LoadingButton>
                            <Typography component="p" textAlign="center" mt={2}>
                                {isLoginForm ? (
                                    <>
                                        Don&apos;t have an account?{' '}
                                        <Link href="/auth/register" className={styles.link}>
                                            Sign up
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <Link href="/auth/login" className={styles.link}>
                                            Sign in
                                        </Link>
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
