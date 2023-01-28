import { useRouter } from 'next/router';
import { useLogoutMutation } from 'src/services/api';
import useErrorsHandler from 'src/utils/errorsHandler';

type CallbackType = () => MaybePromise<void>;

function useLogout(logoutCallback?: CallbackType) {
    const router = useRouter();
    const [logout, { isLoading }] = useLogoutMutation();

    const logoutHandler = useErrorsHandler(async () => {
        await logoutCallback?.();
        router.push('/');
        await logout().unwrap();
    });

    return { isLoading, logoutHandler };
}

export default useLogout;
