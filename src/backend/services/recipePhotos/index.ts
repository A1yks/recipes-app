import { RECIPE_IMAGES_FOLDER_PATH } from '@backend/controllers/recipePhotos';
import { RecipeAttrs } from '@backend/models/Recipe';
import RecipePhoto, { RecipePhotoAttrs } from '@backend/models/RecipePhoto';
import { ErrorTypes } from '@backend/types/errors';
import path from 'path';
import FileUploaderService from '../fileUploader';

export const MAX_PHOTOS_NUMBER = 10;

namespace RecipePhotosService {
    export async function addPhotos(fileNames: string[], recipeId: RecipeAttrs['id']) {
        const canPhotosBeAdded = await checkUploadAbility(recipeId);

        if (!canPhotosBeAdded) {
            throw new Error('You have uploaded the maximum number of photos', { cause: ErrorTypes.LIMIT_EXCEEDED });
        }

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
        await FileUploaderService.deleteFileFromDisk(path.join(RECIPE_IMAGES_FOLDER_PATH, photo.fileName));
    }

    async function checkUploadAbility(recipeId: RecipeAttrs['id']) {
        const number = await RecipePhoto.count({ where: { recipeId } });

        return number < MAX_PHOTOS_NUMBER;
    }
}

export default RecipePhotosService;
