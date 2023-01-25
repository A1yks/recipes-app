import { passwordFieldSchema } from '@backend/controllers/auth/validation';
import Joi from 'joi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useLogout from 'src/hooks/useLogout';
import { useDeleteAccountMutation } from 'src/services/api';
import useErrorsHandler from 'src/utils/errorsHandler';
import joiResolver from 'src/utils/joiResolver';

function useAccountActions() {
    const router = useRouter();
    const { isLoading: isLoggingOut, logoutHandler } = useLogout();
    const [deleteAccountMutation, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();
    const [isDeleteAccountDialogOpened, setIsDeleteAccountDialogOpened] = useState(false);
    const [isSignOutDialogOpened, setIsSignOutDialogOpened] = useState(false);
    const [password, setPassword] = useState('');
    const { control, handleSubmit } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(
            Joi.object({
                password: passwordFieldSchema.required(),
            })
        ),
    });

    const openDeleteAccountDialogHandler = () => setIsDeleteAccountDialogOpened(true);

    const closeDeleteAccountDialogHandler = () => {
        setIsDeleteAccountDialogOpened(false);
        setPassword('');
    };

    const openSignOutDialogHandler = () => setIsSignOutDialogOpened(true);

    const closeSignOutDialogHandler = () => setIsSignOutDialogOpened(false);

    const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const deleteAccount = useErrorsHandler(async () => {
        await deleteAccountMutation(password).unwrap();
        closeDeleteAccountDialogHandler();
        router.push('/');
    });

    const deleteAccountSubmitHandler = handleSubmit(deleteAccount);

    return {
        control,
        isLoggingOut,
        isDeletingAccount,
        isDeleteAccountDialogOpened,
        isSignOutDialogOpened,
        password,
        logoutHandler,
        deleteAccountSubmitHandler,
        openDeleteAccountDialogHandler,
        closeDeleteAccountDialogHandler,
        openSignOutDialogHandler,
        closeSignOutDialogHandler,
        changePasswordHandler,
    };
}

export default useAccountActions;
