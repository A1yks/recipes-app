import { NextPageContext } from 'next';
import { AppStore, wrapper } from 'src/store';

type CallbackType = (
    store: AppStore,
    ctx: NextPageContext
) => Promise<Pages.InitialPropsResult> | Pages.InitialPropsResult;

function getInitialPageProps(callback: CallbackType) {
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
    });
}

export default getInitialPageProps;
