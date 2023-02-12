import React, { useState } from 'react';
import useDialogControl from 'src/hooks/useDialogControl';
import clearInput from 'src/utils/clearInput';

function useSearch() {
    const [isSearchOpened, openSearchHandler, closeSearch] = useDialogControl();
    const [searchText, setSearchText] = useState('');

    function closeSearchHandler() {
        clearInput(setSearchText);
        closeSearch();
    }

    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

    return { searchText, isSearchOpened, searchInputHandler, openSearchHandler, closeSearchHandler };
}

export default useSearch;
