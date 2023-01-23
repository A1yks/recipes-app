import { useSnackbar } from 'notistack';
import { extractError } from './extractError';

const isDev = process.env.NODE_ENV !== 'production';

function useErrorsHandler(callback: () => void | Promise<void>, log = isDev) {
    const { enqueueSnackbar } = useSnackbar();

    return async () => {
        try {
            await callback();
        } catch (err) {
            if (log) {
                console.error(err);
            }

            enqueueSnackbar(extractError(err), { variant: 'error' });
        }
    };
}

export default useErrorsHandler;
