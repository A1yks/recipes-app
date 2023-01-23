import { ContainerProps, experimental_extendTheme as extendTheme, responsiveFontSizes, Theme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import Link from 'src/components/Link';

const primaryMain = '#ff642f';

let theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: primaryMain,
                    contrastText: '#fff',
                },
                neutral: {
                    main: '#f9f9f9',
                    contrastText: '#000',
                },
            },
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: Link,
                underline: 'hover',
                color: '#000',
                sx: {
                    transition: 'color 0.25s ease',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                        color: primaryMain,
                    },
                },
            } as LinkProps,
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                },
            },
        },
        MuiMenuItem: {
            defaultProps: {
                sx: {
                    fontSize: {
                        sm: '1rem',
                        xs: '0.9rem',
                    },
                    minHeight: 'auto',
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme) as typeof theme;

export default theme;
