import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Set up storage engine
const storage = multer.diskStorage({
    destination: './files/',
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Check file type
function checkFileType(
    file: Express.Multer.File,
    cb: FileFilterCallback
) {
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Images only'));
    }
}

// Create multer instance
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
        checkFileType(file, cb);
    },
});
