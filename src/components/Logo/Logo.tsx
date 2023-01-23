import { Grid, SxProps, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from 'src/config';

function Logo(props: SxProps) {
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid
            item
            sx={{
                position: 'relative',
                height: matchesSm ? 35 : 60,
                maxWidth: matchesSm ? '6.875rem' : '10rem',
                width: '100%',
                ...props,
            }}
        >
            <Link href="/">
                <Image src="/images/logo.svg" fill alt="" />
            </Link>
        </Grid>
    );
}

export default Logo;
