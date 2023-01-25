import Head from 'next/head';
import Header from 'src/features/Header';
import { PageLayoutProps } from './PageLayout.types';

// TODO add footer
function PageLayout(props: PageLayoutProps) {
    const title = `${props.title} | Tastebite`;

    return (
        <>
            {props.title !== undefined && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <Header />
            {props.children}
        </>
    );
}

export default PageLayout;
