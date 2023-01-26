import { Grid } from '@mui/material';
import Head from 'next/head';
import Footer from 'src/features/Footer';
import Header from 'src/features/Header';
import { PageLayoutProps } from './PageLayout.types';

function PageLayout(props: PageLayoutProps) {
    const title = `${props.title} | Tastebite`;

    return (
        <>
            {props.title !== undefined && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <Grid container direction="column" minHeight="100vh">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item>{props.children}</Grid>
                <Grid item mt="auto">
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
}

export default PageLayout;
