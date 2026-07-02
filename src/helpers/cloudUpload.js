import path from 'path';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// ✅ Set up Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'inventory/images', // Folder for storing images
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    public_id: (req, file) => 'image_' + Date.now(), // Unique file name
  },
});

// ✅ File filter for images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    req.fileValidationError = 'Invalid image file format';
    return cb(new Error('Invalid image file format'), false);
  }

  cb(null, true);
};

// ✅ Multer configuration (only images)
const cloudUpload = multer({
  storage: imageStorage,
  fileFilter: fileFilter,
}).single('image'); // only one image field

export default cloudUpload;
