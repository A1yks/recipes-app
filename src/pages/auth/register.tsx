import Auth from 'src/features/Auth';
import Head from 'next/head';

function Register() {
    return (
        <>
            <Head>
                <title>Registration | Tastebite</title>
            </Head>
            <Auth type="register" />
        </>
    );
}

export default Register;
