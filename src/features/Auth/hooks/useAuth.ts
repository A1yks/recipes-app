import { loginSchema, registrationSchema } from '@backend/controllers/auth/validation';
import { joiResolver } from '@hookform/resolvers/joi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthMutation } from 'src/services/api';
import { AuthReq } from 'src/services/api/types';
import { AuthProps, FormState } from '../Auth.types';
import useErrorsHandler from 'src/utils/errorsHandler';

function useAuth(props: AuthProps) {
    const router = useRouter();
    const [auth, { isLoading }] = useAuthMutation();

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

    const authHandler = useErrorsHandler(async () => {
        const body = getReqBody();

        await auth(body).unwrap();
        router.push('/');
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
