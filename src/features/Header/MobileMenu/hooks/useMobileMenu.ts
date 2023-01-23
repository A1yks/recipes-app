import { useRouter } from 'next/router';
import { useState } from 'react';

function useMobileMenu() {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const router = useRouter();

    const openDrawerHandler = () => setIsDrawerOpened(true);

    const closeDrawerHandler = () => setIsDrawerOpened(false);

    function linkClickHandler(href: string) {
        return () => router.push(href);
    }

    return { isDrawerOpened, openDrawerHandler, closeDrawerHandler, linkClickHandler };
}

export default useMobileMenu;
