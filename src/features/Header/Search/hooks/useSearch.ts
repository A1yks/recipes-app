import { useState } from 'react';

function useSearch() {
    const [isSearchOpened, setIsSearchOpened] = useState(false);

    const openSearchHandler = () => setIsSearchOpened(true);

    const closeSearchHandler = () => setIsSearchOpened(false);

    return { isSearchOpened, openSearchHandler, closeSearchHandler };
}

export default useSearch;
