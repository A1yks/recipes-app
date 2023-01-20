import Auth from 'features/Auth';
import Head from 'next/head';

function Register() {
    return (
        <>
            <Head>
                <title>Tastebite | Registration</title>
            </Head>
            <Auth type="register" />
        </>
    );
}

export default Register;
