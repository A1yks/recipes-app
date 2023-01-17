import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { FileUploaderConfiguration } from './types';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';
import logger from 'backend/utils/logger';

namespace FileUploaderService {
    export async function deleteFilesFromDisk(files: Express.Multer.File[]) {
        await Promise.all(
            files.map(async (file) => {
                await deleteFileFromDisk(file.path);
            })
        );
    }

    export async function deleteFileFromDisk(filePath: string) {
        try {
            await fs.unlink(filePath);

            return true;
        } catch (err) {
            logger.error(err);

            return false;
        }
    }

    export function createUploader(config: FileUploaderConfiguration) {
        async function fileFilter(req: Server.Request, file: Express.Multer.File, callback: FileFilterCallback) {
            try {
                const result = await config.fileFilter?.(file);

                callback(null, !!result);
            } catch (err) {
                if (err instanceof Error) {
                    callback(err);
                    return;
                }

                callback(new Error('Unknown error happened during file uploading'));
            }
        }

        const storage = multer.diskStorage({
            destination: config.destination,
            filename(req, file, callback) {
                const ext = path.extname(file.originalname);

                callback(null, `${uuid()}${ext}`);
            },
        });

        return multer({
            storage,
            fileFilter,
            limits: config.limits || {
                fileSize: 20 * 1024 * 1024,
            },
        }).array(config.fieldName, config.maxFiles || 20);
    }
}

export default FileUploaderService;
