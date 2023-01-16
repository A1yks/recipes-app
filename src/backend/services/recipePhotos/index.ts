import { RecipeAttrs } from 'backend/models/Recipe';
import RecipePhoto, { RecipePhotoAttrs } from 'backend/models/RecipePhoto';
import { ErrorTypes } from 'backend/types/errors';
import path from 'path';
import { deleteFileFromDisk, IMAGES_FOLDER_PATH } from './multer';

namespace RecipePhotosService {
    export async function addPhotos(fileNames: string[], recipeId: RecipeAttrs['id']) {
        const creationData = fileNames.map((fileName) => ({ fileName, recipeId } as RecipePhotoAttrs));
        const photos = await RecipePhoto.bulkCreate(creationData);

        return photos;
    }

    export async function getPhoto(photoAttrs: Partial<RecipePhotoAttrs>) {
        return await RecipePhoto.findOne({ where: photoAttrs });
    }

    export async function deletePhoto(photoId: RecipePhotoAttrs['id']) {
        const photo = await RecipePhoto.findByPk(photoId);

        if (photo === null) {
            throw new Error('Photo with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
        }

        await photo.destroy();
        await deleteFileFromDisk(path.join(IMAGES_FOLDER_PATH, photo.fileName));
    }
}

export default RecipePhotosService;
