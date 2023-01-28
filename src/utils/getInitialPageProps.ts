import { NextPageContext } from 'next';
import { AppStore, wrapper } from 'src/store';

type CallbackType<T> = (store: AppStore, ctx: NextPageContext) => T;

function getInitialPageProps<T>(callback: CallbackType<T>) {
    return wrapper.getInitialPageProps((store) => async (ctx) => {
        if (!ctx.req) {
            return {};
        }

        try {
            return await callback(store, ctx);
        } catch (err) {
            console.error(err);
            return {};
        }
    }) as unknown as CallbackType<T>;
}

export default getInitialPageProps;
