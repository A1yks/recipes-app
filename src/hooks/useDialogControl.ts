import { useCallback, useState } from 'react';

type DialogControlFunction = () => void;

type UseDialogControlReturnType = [boolean, DialogControlFunction, DialogControlFunction];

/**
 * Hook for managing the state of a dialog
 *
 * @param isInitiallyOpened Determines if the dialog is initially opened or not. Default is `false`.
 * @returns An array consisting of three values:
 *   - isOpened: A boolean value representing the current state of the dialog (whether it's open or closed).
 *   - openDialog: A function that can be used to open the dialog.
 *   - closeDialog: A function that can be used to close the dialog.
 */

function useDialogControl(isInitiallyOpened = false): UseDialogControlReturnType {
    const [isOpened, setIsOpened] = useState(isInitiallyOpened);

    const openDialog = useCallback(() => {
        setIsOpened(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpened(false);
    }, []);

    return [isOpened, openDialog, closeDialog];
}

export default useDialogControl;
