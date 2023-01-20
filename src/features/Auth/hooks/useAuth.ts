import { useEffect, useState } from 'react';
import { useAuthMutation } from 'src/services/auth';
import { AuthProps, FormState } from '../Auth.types';

function useAuth(props: AuthProps) {
    const [auth, { isLoading }] = useAuthMutation();
    const [formState, setFormState] = useState<FormState>({
        login: '',
        password: '',
        name: '',
        surname: '',
    });
    const isLoginForm = props.type === 'login';
    const formText = isLoginForm ? 'Sign in' : 'Sign up';
    const autoComplete = isLoginForm ? 'on' : 'new-password';

    async function authHandler() {
        const { login, password, name, surname } = formState;

        try {
            await auth({
                login,
                password,
                type: props.type,
                name: name.trim() || undefined,
                surname: surname.trim() || undefined,
            }).unwrap();

            console.log('Success');
        } catch (err) {
            console.error(err);
        }
    }

    function changeHandler(field: keyof FormState) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormState((prev) => ({ ...prev, [field]: e.target.value }));
        };
    }

    return { isLoading, isLoginForm, formText, autoComplete, formState, authHandler, changeHandler };
}

export default useAuth;
