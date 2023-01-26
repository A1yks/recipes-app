import { Box, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function Logo(props: Props.WithSx) {
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                position: 'relative',
                height: matchesSm ? 35 : 60,
                maxWidth: matchesSm ? '6.875rem' : '10rem',
                width: '100%',
                ...props.sx,
            }}
        >
            <Link href="/">
                <Image src="/images/logo.svg" fill alt="" />
            </Link>
        </Box>
    );
}

export default Logo;
