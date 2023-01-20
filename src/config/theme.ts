import { createTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import Link from 'components/Link';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff642f',
            contrastText: '#fff',
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: Link,
                underline: 'hover',
            } as LinkProps,
        },
    },
});

export default theme;
