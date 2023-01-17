import multer from 'multer';

export type FileUploaderConfiguration = {
    fieldName: string;
    destination: string;
    fileFilter?: (file: Express.Multer.File) => boolean | Promise<boolean>;
    limits?: multer.Options['limits'];
    maxFiles?: number;
};
