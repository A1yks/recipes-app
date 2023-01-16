import { MulterError } from 'multer';
import { ValidationError } from 'joi';
import { DeleteRecipePhotoReq, UploadRecipePhotoReq } from './types';
import errorsHandler from 'backend/utils/errorsHander';
import RecipePhotosService from 'backend/services/recipePhotos';
import { uploadRecipePhotosSchema } from './validation';
import { upload, deleteFilesFromDisk } from '../../services/recipePhotos/multer';
import { checkUserPermissionsForOperationsWithRecipe } from '../recipes/permissions';
import { ErrorTypes } from 'backend/types/errors';

namespace RecipePhotosController {
    export async function uploadPhotos(req: Server.Request<UploadRecipePhotoReq>, res: Server.Response) {
        const errorStr = 'An unexpected error occured while uploading file(s) to the server';

        upload(req, res, async (err) => {
            const files = req.files as Express.Multer.File[] | undefined;

            try {
                if (err) throw err;

                if (files !== undefined && files.length > 0) {
                    validateRequestBody(req.body);
                    await checkPermissions(req);

                    const { recipeId } = req.body;
                    const fileNames = files.map((file) => file.filename);
                    const photos = await RecipePhotosService.addPhotos(fileNames, recipeId);

                    res.status(201).json({ data: photos });
                } else {
                    res.status(400).json({ error: 'No files were uploaded' });
                }
            } catch (err) {
                if (files !== undefined) {
                    await deleteFilesFromDisk(files);
                }

                errorsHandler(err, {
                    res,
                    unexpectedErrMsg: errorStr,
                    expectedErrors: [
                        [ValidationError, 400],
                        [MulterError, 400],
                        [ErrorTypes.NO_PERMISSIONS, 403],
                    ],
                });
            }
        });
    }

    export async function deletePhoto(req: Server.Request<DeleteRecipePhotoReq>, res: Server.Response) {
        const { photoId } = req.body;

        try {
            await RecipePhotosService.deletePhoto(photoId);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the image',
            });
        }
    }

    async function checkPermissions(req: Server.Request<UploadRecipePhotoReq>) {
        const result = await checkUserPermissionsForOperationsWithRecipe(req, req.userId!);

        if (!result) {
            throw new Error("You don't have permissions to perform this operation", {
                cause: ErrorTypes.NO_PERMISSIONS,
            });
        }
    }

    function validateRequestBody(body: UploadRecipePhotoReq) {
        const { error } = uploadRecipePhotosSchema.validate(body);

        if (error !== undefined) {
            throw error;
        }
    }
}

export default RecipePhotosController;