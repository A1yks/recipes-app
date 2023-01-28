import { JSXElementConstructor, ReactElement } from 'react';

export type AuthCheckerProps = {
    children: ReactElement<any, JSXElementConstructor<any> & { isProtectedRoute?: boolean }>;
};
