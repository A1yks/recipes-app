import { Box, Container, Divider, Grid, Link, Typography, useTheme } from '@mui/material';
import Logo from 'src/components/Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: theme.palette.neutral.main, pt: 6, pb: 3 }}>
            <Container>
                <Grid container justifyContent="space-between">
                    <Grid container item direction="column" md={4}>
                        <Grid item>
                            <Logo sx={{ mx: { xs: 'auto', sm: 0 } }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                color="gray"
                                mt={2}
                                sx={{ textAlign: { xs: 'center', sm: 'start' } }}
                            >
                                On the other hand, we denounce with righteous indignation and dislike men who are so
                                beguiled and demoralized by the charms of pleasure of the moment
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        md={5}
                        justifyContent="space-between"
                        alignItems="center"
                        gap={3}
                        sx={{
                            '& ul': {
                                '& li': {
                                    mt: 1,
                                    fontSize: '0.9rem',
                                    color: 'gray',
                                },
                            },
                            mt: {
                                md: 0,
                                xs: 3,
                            },
                            '& > div': {
                                '& ul, & .menu-title': {
                                    textAlign: {
                                        xs: 'center',
                                        sm: 'left',
                                    },
                                },
                            },
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                        }}
                    >
                        <Grid item>
                            <Typography fontWeight="bold" className="menu-title">
                                Tastebite
                            </Typography>
                            <ul>
                                <Typography component="li" variant="body1">
                                    <Link href="/about">About</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Careers</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Contact us</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Feedback</Link>
                                </Typography>
                            </ul>
                        </Grid>
                        <Grid item>
                            <Typography fontWeight="bold" className="menu-title">
                                Legal
                            </Typography>
                            <ul>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Terms</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Conditions</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Cookie</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Copyright</Link>
                                </Typography>
                            </ul>
                        </Grid>
                        <Grid item>
                            <Typography fontWeight="bold" className="menu-title">
                                Follow
                            </Typography>
                            <ul>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Facebook</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Twitter</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Instagram</Link>
                                </Typography>
                                <Typography component="li" variant="body1">
                                    <Link href="#">Youtube</Link>
                                </Typography>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 6, mb: 3 }} />
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                    }}
                >
                    <Grid item sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="gray">
                            © 2023 Tastebite - All rights reserved
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            '& svg': {
                                fill: 'gray',

                                '&:hover': {
                                    fill: theme.palette.primary.main,
                                },
                            },
                            '& a:not(:first-of-type)': {
                                ml: 2,
                            },
                            mt: {
                                xs: 2,
                                sm: 0,
                            },
                        }}
                    >
                        <Link href="#">
                            <FacebookIcon />
                        </Link>
                        <Link href="#">
                            <InstagramIcon />
                        </Link>
                        <Link href="#">
                            <TwitterIcon />
                        </Link>
                        <Link href="#">
                            <YouTubeIcon />
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
