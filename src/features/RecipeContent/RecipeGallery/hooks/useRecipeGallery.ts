import { RecipePhotoAttrs } from '@backend/models/RecipePhoto';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import useCanEdit from 'src/hooks/useCanEdit';
import useDialogControl from 'src/hooks/useDialogControl';
import useRecipe from 'src/hooks/useRecipe';
import useSelectImages from 'src/hooks/useSelectImages';
import { useDeleteRecipePhotoMutation, useUploadRecipePhotosMutation } from 'src/services/api';
import createFormData from 'src/utils/createFormData';
import useErrorsHandler from 'src/utils/errorsHandler';

function useRecipeGallery() {
    const { enqueueSnackbar } = useSnackbar();
    const { photos, id: recipeId } = useRecipe();
    const canEdit = useCanEdit();
    const [isDialogOpened, openDialog, closeDialog] = useDialogControl();
    const [uploadRecipePhotoMutation, { isLoading: isUploading }] = useUploadRecipePhotosMutation();
    const [deleteRecipePhotoMutation, { isLoading: isDeleting }] = useDeleteRecipePhotoMutation();
    const photoIdToDeleteRef = useRef<RecipePhotoAttrs['id'] | null>(null);

    const uploadRecipePhotos = useErrorsHandler(async (files: FileList) => {
        const formData = createFormData('photos', files);

        formData.append('recipeId', recipeId.toString());
        await uploadRecipePhotoMutation(formData).unwrap();
        enqueueSnackbar('Image was successfully uploaded', { variant: 'success' });
    });

    const deleteImageHandler = useErrorsHandler(async () => {
        if (photoIdToDeleteRef.current === null) {
            enqueueSnackbar('The photo to be deleted was not selected', { variant: 'error' });
        } else {
            await deleteRecipePhotoMutation({ recipeId, photoId: photoIdToDeleteRef.current }).unwrap();
            closeDialogHandler();
            enqueueSnackbar('Image was successfully deleted', { variant: 'success' });
        }
    });

    const uploadImagesHandler = useSelectImages(uploadRecipePhotos, { maxFiles: 10, maxFileSize: 5 * 1024 * 1024 });

    function openDialogHandler(photoId: RecipePhotoAttrs['id']) {
        return () => {
            photoIdToDeleteRef.current = photoId;
            openDialog();
        };
    }

    function closeDialogHandler() {
        closeDialog();
        photoIdToDeleteRef.current = null;
    }

    return {
        photos,
        canEdit,
        isUploading,
        isDeleting,
        isDialogOpened,
        uploadImagesHandler,
        deleteImageHandler,
        openDialogHandler,
        closeDialogHandler,
    };
}

export default useRecipeGallery;
