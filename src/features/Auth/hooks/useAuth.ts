import { loginSchema, registrationSchema } from '@backend/controllers/auth/validation';
import { useRouter } from 'next/router';
import { useAuthMutation } from 'src/services/api';
import { AuthReq } from 'src/services/api/types';
import { AuthProps } from '../Auth.types';
import useErrorsHandler from 'src/utils/errorsHandler';
import useUserDataValidation from 'src/hooks/useUserDataValidation';

function useAuth(props: AuthProps) {
    const router = useRouter();
    const [auth, { isLoading }] = useAuthMutation();

    const authHandler = useErrorsHandler(async () => {
        const body = getReqBody();

        await auth(body).unwrap();

        if (props.type === 'login') {
            router.push(window.lastHref || '/');
        } else {
            router.push('/');
        }
    });

    const { control, formState, changeHandler, submitHandler } = useUserDataValidation(
        authHandler,
        props.type === 'login' ? loginSchema : registrationSchema
    );

    const isLoginForm = props.type === 'login';
    const formText = isLoginForm ? 'Sign in' : 'Sign up';
    const autoComplete = isLoginForm ? 'on' : 'new-password';

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
