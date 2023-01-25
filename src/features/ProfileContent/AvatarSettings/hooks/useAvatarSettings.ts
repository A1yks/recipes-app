import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDeleteAvatarMutation, useUploadAvatarMutation } from 'src/services/api';
import { useAppSelector } from 'src/store/hooks';
import useErrorsHandler from 'src/utils/errorsHandler';

function useAvatarSettings() {
    const user = useAppSelector((state) => state.auth.user);
    const isAvatarUploaded = !!user?.avatar;
    const [uploadAvatarMutation, { isLoading: isUploading }] = useUploadAvatarMutation();
    const [deleteAvatarMutation, { isLoading: isDeleting }] = useDeleteAvatarMutation();
    const [isDeleteAvatarDialogOpened, setIsDeleteAvatarDialogOpened] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const openDeleteAvatarDialogHandler = () => setIsDeleteAvatarDialogOpened(true);

    const closeDeleteAvatarDialogHandler = () => setIsDeleteAvatarDialogOpened(false);

    const uploadAvatar = useErrorsHandler(async (formData: FormData) => {
        await uploadAvatarMutation(formData).unwrap();
        enqueueSnackbar('Avatar was successfully uploaded', { variant: 'success' });
    });

    const deleteAvatarHandler = useErrorsHandler(async () => {
        await deleteAvatarMutation().unwrap();
        closeDeleteAvatarDialogHandler();
        enqueueSnackbar('Avatar was successfully deleted', { variant: 'success' });
    });

    function createFormData(file: File) {
        const formData = new FormData();

        formData.append('avatar', file);

        return formData;
    }

    function chooseAvatarHandler() {
        const inp = document.createElement('input');

        inp.type = 'file';
        inp.accept = 'image/*';

        inp.addEventListener('change', async () => {
            const file = inp.files?.item(0);

            if (!file) {
                enqueueSnackbar('You have not choosen any file');
                return;
            }

            const formData = createFormData(file);

            uploadAvatar(formData);
        });

        inp.click();
    }

    return {
        isAvatarUploaded,
        isUploading,
        isDeleting,
        isDeleteAvatarDialogOpened,
        chooseAvatarHandler,
        deleteAvatarHandler,
        openDeleteAvatarDialogHandler,
        closeDeleteAvatarDialogHandler,
    };
}

export default useAvatarSettings;
