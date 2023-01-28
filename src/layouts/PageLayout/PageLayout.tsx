import { Grid } from '@mui/material';
import Head from 'next/head';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
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
            <Grid container direction="column" minHeight="100vh" height="0px" flexWrap="nowrap">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item flex={1}>
                    {props.children}
                </Grid>
                <Grid item mt="auto">
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
}

export default PageLayout;
