import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from 'store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createEmotionCache, theme } from 'config';
import { CacheProvider, EmotionCache } from '@emotion/react';

interface CustomAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

type WrapperResult = Omit<ReturnType<typeof wrapper['useWrappedStore']>, 'props'> & { props: CustomAppProps };

const clientSideEmotionCache = createEmotionCache();

function App({ Component, ...rest }: CustomAppProps) {
    const { store, props } = wrapper.useWrappedStore(rest) as WrapperResult;
    const { emotionCache = clientSideEmotionCache } = props;

    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...props.pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    );
}

export default App;
