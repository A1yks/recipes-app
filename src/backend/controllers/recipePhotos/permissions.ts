import RecipePhotosService from 'backend/services/recipePhotos';
import checkRecipePermissionHelper from 'backend/utils/checkRecipePermissionsHelper';
import { DeleteRecipePhotoReq, UploadRecipePhotoReq } from './types';

async function checkRecipePhotosPermissions(req: Server.Request<DeleteRecipePhotoReq>) {
    const { recipeId, photoId } = req.body;
    const photo = await RecipePhotosService.getPhoto({ id: photoId, recipeId });

    return photo !== null;
}

export const checkUserPermissionsForOperationsWithRecipePhotos =
    checkRecipePermissionHelper(checkRecipePhotosPermissions);
