import { loginSchema, registrationSchema } from '@backend/controllers/auth/validation';
import { joiResolver } from '@hookform/resolvers/joi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthMutation } from 'src/services/auth';
import { AuthReq } from 'src/services/auth/types';
import { extractError } from 'src/utils/extractError';
import { AuthProps, FormState } from '../Auth.types';
import { useSnackbar } from 'notistack';

function useAuth(props: AuthProps) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [auth, { isLoading, error: authError }] = useAuthMutation();
    const { control, handleSubmit } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(props.type === 'login' ? loginSchema : registrationSchema, {
            errors: { wrap: { label: false } },
            abortEarly: false,
        }),
    });
    const [formState, setFormState] = useState<FormState>({
        login: '',
        password: '',
        name: '',
        surname: '',
    });
    const isLoginForm = props.type === 'login';
    const formText = isLoginForm ? 'Sign in' : 'Sign up';
    const autoComplete = isLoginForm ? 'on' : 'new-password';
    const submitHandler = handleSubmit(authHandler);

    function getReqBody() {
        const { login, password, name, surname } = formState;
        const reqBody: AuthReq =
            props.type === 'login'
                ? {
                      type: 'login',
                      login,
                      password,
                  }
                : {
                      type: 'register',
                      login,
                      password,
                      name,
                      surname,
                  };

        return reqBody;
    }

    async function authHandler() {
        const body = getReqBody();

        try {
            await auth(body).unwrap();
            router.push('/');
        } catch (err) {
            console.error(err);
            enqueueSnackbar(extractError(err), { variant: 'error' });
        }
    }

    function changeHandler(field: keyof FormState) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormState((prev) => ({ ...prev, [field]: e.target.value }));
        };
    }

    return {
        isLoading,
        isLoginForm,
        formText,
        autoComplete,
        formState,
        control,
        submitHandler,
        changeHandler,
    };
}

export default useAuth;
