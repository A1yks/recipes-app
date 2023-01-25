import FileUploaderService from '@backend/services/fileUploader';
import UserService from '@backend/services/user';
import { ErrorTypes } from '@backend/types/errors';
import errorsHandler from '@backend/utils/errorsHander';
import isValidMimeType from '@backend/utils/isValidMimeType';
import { MulterError } from 'multer';
import path from 'path';
import { DeleteUserReq, EditUserReq } from './types';

export const USER_AVATARS_FOLDER_PATH = path.resolve('./images/avatars');

namespace UserController {
    const upload = FileUploaderService.createUploader({
        destination: USER_AVATARS_FOLDER_PATH,
        fieldName: 'avatar',
        fileFilter: isValidMimeType,
        maxFiles: 1,
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    });

    export async function uploaAvatar(req: Server.Request, res: Server.Response) {
        upload(req, res, async (err) => {
            const { file, userId } = req;

            try {
                if (err) throw err;

                if (file !== undefined) {
                    const updatedUser = await UserService.editData({ avatar: file.filename }, userId!);

                    res.status(201).json({ data: updatedUser });
                } else {
                    res.status(400).json({ error: 'File was not uploaded' });
                }
            } catch (err) {
                if (file !== undefined) {
                    await FileUploaderService.deleteFileFromDisk(file.path);
                }

                errorsHandler(err, {
                    res,
                    unexpectedErrMsg: 'An unexpected error occured while uploading new avatar',
                    expectedErrors: [
                        [MulterError, 400],
                        [ErrorTypes.NOT_FOUND, 404],
                    ],
                });
            }
        });
    }

    export async function deleteAvatar(req: Server.Request, res: Server.Response) {
        try {
            await UserService.deleteAvatar(req.userId!);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the avatar',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function editAccountData(req: Server.Request<EditUserReq>, res: Server.Response) {
        try {
            const updatedUser = await UserService.editData(req.body, req.userId!);

            res.status(200).json({ data: updatedUser });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while editing account data',
                expectedErrors: [
                    [ErrorTypes.NOT_FOUND, 404],
                    [ErrorTypes.ALREADY_EXISTS, 400],
                ],
            });
        }
    }

    export async function deleteAccount(req: Server.Request<DeleteUserReq>, res: Server.Response) {
        const { password } = req.body;

        try {
            await UserService.deleteUser(req.userId!, password);
            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the account',
                expectedErrors: [
                    [ErrorTypes.NOT_FOUND, 404],
                    [ErrorTypes.BAD_DATA, 400],
                ],
            });
        }
    }
}

export default UserController;
