import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from 'next/document';
import { createEmotionCache } from 'src/config';
import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import { CustomPageProps } from './_app';

type CustomDocumentProps = Awaited<ReturnType<typeof MyDocument['getInitialProps']>>;

function MyDocument(props: CustomDocumentProps) {
    return (
        <Html lang="en">
            <Head>{props.emotionStyleTags}</Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: AppType<CustomPageProps>) => (props) => {
                const { pageProps, ...restProps } = props;

                return <App {...restProps} pageProps={{ ...pageProps, emotionCache: cache }} />;
            },
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};

export default MyDocument;
