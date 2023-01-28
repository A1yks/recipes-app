import { useTheme, useMediaQuery, PaginationProps } from '@mui/material';

function useResponsive() {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
    const cols = matchesMd ? 3 : matchesSm ? 2 : 1;
    const paginationSize: PaginationProps['size'] = matchesSm ? 'medium' : 'large';

    return { cols, matchesMd, matchesSm, paginationSize };
}

export default useResponsive;
