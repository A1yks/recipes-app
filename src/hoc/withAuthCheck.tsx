import { bindActionCreators } from '@reduxjs/toolkit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useBrowserLayoutEffect from 'src/hooks/useBrowserLayoutEffect';
import { useAppSelector } from 'src/store/hooks';
import { authSlice } from 'src/store/reducers/auth';
import getInitialPageProps from 'src/utils/getInitialPageProps';

function withAuthCheck(Component: NextPage) {
    function WrapperComponent(props: {}) {
        return <Component {...props} />;
    }

    WrapperComponent.isProtectedRoute = true;

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
