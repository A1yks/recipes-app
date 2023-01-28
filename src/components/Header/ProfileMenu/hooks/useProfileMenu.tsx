import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useLogout from 'src/hooks/useLogout';
import { useAppSelector } from 'src/store/hooks';

function useProfileMenu() {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthorized = user !== null;
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const isMenuOpened = !!menuAnchorEl;

    const openMenuHandler = (e: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(e.currentTarget);

    const closeMenuHandler = () => setMenuAnchorEl(null);

    const { isLoading: isLoggingOut, logoutHandler } = useLogout(closeMenuHandler);

    function openLinkHandler(href: string) {
        return () => {
            closeMenuHandler();
            router.push(href);
        };
    }

    return {
        isAuthorized,
        isMenuOpened,
        isLoggingOut,
        menuAnchorEl,
        openMenuHandler,
        closeMenuHandler,
        openLinkHandler,
        logoutHandler,
    };
}

export default useProfileMenu;
