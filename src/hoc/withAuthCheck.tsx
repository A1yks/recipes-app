import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useBrowserLayoutEffect from 'src/hooks/useBrowserLayoutEffect';
import { useAppSelector } from 'src/store/hooks';
import getInitialPageProps from 'src/utils/getInitialPageProps';

function withAuthCheck(Component: NextPage) {
    function WrapperComponent(props: {}) {
        const router = useRouter();
        const { user, isLoggedOut } = useAppSelector((state) => state.auth);

        useBrowserLayoutEffect(() => {
            if (user === null && !isLoggedOut) {
                router.replace('/auth/login');
            }
        }, [user, router, isLoggedOut]);

        return <Component {...props} />;
    }

    WrapperComponent.getInitialProps = getInitialPageProps(async (store, ctx) => {
        try {
            const { res } = ctx;
            const {
                auth: { user },
            } = store.getState();

            if (user === null) {
                res?.writeHead(302, {
                    Location: '/auth/login',
                }).end();
            }

            const data = await Component.getInitialProps?.(ctx);

            return { ...data };
        } catch (err) {
            console.error(err);
        }

        return {};
    });

    return WrapperComponent;
}

export default withAuthCheck;
