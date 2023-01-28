import { useRouter } from 'next/router';
import { useState } from 'react';
import useBrowserLayoutEffect from 'src/hooks/useBrowserLayoutEffect';
import { useAppSelector } from 'src/store/hooks';
import { AuthCheckerProps } from './AuthChecker.type';

function AuthChecker(props: AuthCheckerProps) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const { isProtectedRoute } = props.children.type;

    useBrowserLayoutEffect(() => {
        const routeChangeStartHandler = () => setIsLoading(true);
        const routeChangeCompleteHandler = () => setIsLoading(false);

        router.events.on('routeChangeStart', routeChangeStartHandler);
        router.events.on('routeChangeComplete', routeChangeCompleteHandler);

        if (isProtectedRoute && user === null && router.pathname !== '/') {
            router.push('/auth/login');
        }

        return () => {
            router.events.off('routeChangeStart', routeChangeStartHandler);
            router.events.off('routeChangeComplete', routeChangeCompleteHandler);
        };
    }, [user, router, isProtectedRoute, router.pathname]);

    if (isProtectedRoute && user === null && isLoading && router.pathname !== '/') {
        return null;
    }

    return <>{props.children}</>;
}

export default AuthChecker;
