import logger from 'backend/utils/logger';
import fs from 'fs/promises';
import { PathLike } from 'fs';
import { v4 as uuid } from 'uuid';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export const IMAGES_FOLDER_PATH = path.resolve('./images');

export async function deleteFilesFromDisk(files: Express.Multer.File[]) {
    await Promise.all(
        files.map(async (file) => {
            await deleteFileFromDisk(file.path);
        })
    );
}

export async function deleteFileFromDisk(filePath: PathLike) {
    try {
        await fs.unlink(filePath);

        return true;
    } catch (err) {
        logger.error(err);

        return false;
    }
}

function isValidMimeType(file: Express.Multer.File) {
    return /^image\/.+$/.test(file.mimetype);
}

function fileFilter(req: Server.Request, file: Express.Multer.File, callback: FileFilterCallback) {
    callback(null, isValidMimeType(file));
}

const storage = multer.diskStorage({
    destination: IMAGES_FOLDER_PATH,
    filename(req, file, callback) {
        const ext = path.extname(file.originalname);

        callback(null, `${uuid()}${ext}`);
    },
});

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
}).array('photos', 20);
