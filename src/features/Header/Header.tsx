import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import Logo from 'src/components/Logo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import ProfileMenu from './ProfileMenu';
import Search from './Search';

function Header() {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
    const ml = matchesSm ? 1 : 3;
    const headerHeight = matchesMd ? '5rem' : '7.5rem';

    return (
        <Box component="header" sx={{ height: headerHeight, position: 'relative' }}>
            <Container sx={{ height: '100%' }}>
                <Grid container alignItems="center" justifyContent="space-between" height="100%" component="nav">
                    <Logo />
                    {!matchesMd && <Navigation ml={3} />}
                    <Grid container item width="auto" ml={ml} alignItems="center">
                        <Search />
                        <ProfileMenu sx={{ ml }} />
                        {matchesMd && <MobileMenu sx={{ ml }} />}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Header;
