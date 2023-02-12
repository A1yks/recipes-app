import { useLogoutMutation } from 'src/services/api';
import useErrorsHandler from 'src/utils/errorsHandler';

type CallbackType = () => MaybePromise<unknown>;

function useLogout(logoutCallback?: CallbackType) {
    const [logout, { isLoading }] = useLogoutMutation();

    const logoutHandler = useErrorsHandler(async () => {
        await logout().unwrap();
        await logoutCallback?.();
    });

    return { isLoading, logoutHandler };
}

export default useLogout;
