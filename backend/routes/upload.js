import express from 'express';
import { verifyAdmin } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Upload route (admin only)
router.post('/', verifyAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Check if the file was successfully uploaded to Cloudinary
    if (!req.file.path) {
      return res.status(500).json({
        success: false,
        message: 'File upload failed'
      });
    }

    // Return the Cloudinary URL
    res.status(200).json({
      success: true,
      data: {
        url: req.file.path,
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Handle specific error types
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG and GIF are allowed.'
      });
    }

    if (error.message.includes('File too large')) {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

export default router; 