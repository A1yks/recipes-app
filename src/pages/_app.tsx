import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from 'src/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createEmotionCache, theme } from 'src/config';
import { CacheProvider, EmotionCache } from '@emotion/react';
import App from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import 'src/styles/globals.scss';
import { getAccessToken, getRunningQueriesThunk } from 'src/services/api';
import AuthChecker from 'src/features/AuthChecker';

export type CustomPageProps = {
    emotionCache?: EmotionCache;
};

export type CustomAppProps = AppProps<CustomPageProps>;

type WrapperResult = Omit<ReturnType<typeof wrapper['useWrappedStore']>, 'props'> & { props: CustomAppProps };

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, ...rest }: CustomAppProps) {
    const {
        store,
        props: { pageProps },
    } = wrapper.useWrappedStore(rest) as WrapperResult;
    const { emotionCache = clientSideEmotionCache, ...restPageProps } = pageProps;

    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssVarsProvider theme={theme}>
                        <SnackbarProvider maxSnack={3}>
                            <Head>
                                <meta name="viewport" content="initial-scale=1, width=device-width" />
                            </Head>
                            <CssBaseline />
                            <AuthChecker>
                                <Component {...restPageProps} />
                            </AuthChecker>
                        </SnackbarProvider>
                    </CssVarsProvider>
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
    const { ctx } = appContext;

    if (ctx.req !== undefined) {
        try {
            const { data: response } = await store.dispatch(getAccessToken.initiate(ctx.req.headers.cookie || ''));

            if (response !== undefined) {
                const {
                    data: { cookie },
                } = response;

                if (cookie !== undefined) {
                    ctx.res?.setHeader('set-cookie', cookie);
                }
            }

            await Promise.all(store.dispatch(getRunningQueriesThunk()));

            const componentProps = await App.getInitialProps(appContext);

            return {
                pageProps: {
                    ...componentProps.pageProps,
                },
            };
        } catch (err) {
            console.error(err);
        }
    }

    return { pageProps: {} };
});

export default MyApp;
