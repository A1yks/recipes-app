function isValidMimeType(file: Express.Multer.File) {
    return /^image\/.+$/.test(file.mimetype);
}

export default isValidMimeType;
