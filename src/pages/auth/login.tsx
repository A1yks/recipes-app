import Auth from 'src/features/Auth';
import Head from 'next/head';

function Login() {
    return (
        <>
            <Head>
                <title>Tastebite | Login</title>
            </Head>
            <Auth type="login" />
        </>
    );
}

export default Login;
