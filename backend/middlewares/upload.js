import multer from 'multer';
import { storage } from '../config/cloudinary.js';

// Custom error handler for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next(error);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only allow one file at a time
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error('File size too large. Maximum size is 5MB.'), false);
    }

    cb(null, true);
  }
});

// Export both the upload middleware and error handler
export { handleMulterError };
export default upload; 