import { useSnackbar } from 'notistack';
import { extractError } from './extractError';

type CallbackType = (...args: any[]) => MaybePromise<void>;

const isDev = process.env.NODE_ENV !== 'production';

function useErrorsHandler<T extends CallbackType>(callback: T, log = isDev) {
    const { enqueueSnackbar } = useSnackbar();

    return (async (...args: any[]) => {
        try {
            await callback(...args);
        } catch (err) {
            if (log) {
                console.error(err);
            }

            enqueueSnackbar(extractError(err), { variant: 'error' });
        }
    }) as T;
}

export default useErrorsHandler;
