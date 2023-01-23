import Head from 'next/head';
import Header from 'src/features/Header';
import { PageLayoutProps } from './PageLayout.types';

// TODO add footer
function PageLayout(props: PageLayoutProps) {
    return (
        <>
            {props.title !== undefined && <Head>Tastebite | {props.title}</Head>}
            <Header />
            {props.children}
        </>
    );
}

export default PageLayout;
