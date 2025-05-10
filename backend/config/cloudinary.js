import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let storage;

try {
  // Debug: Log environment variables
  console.log('Cloudinary Config Check:');
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
  console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);

  // Check if required environment variables are present
  const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required Cloudinary environment variables: ${missingVars.join(', ')}`);
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  console.log('✅ Cloudinary Connected');

  // Configure storage
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ayonija',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
  });

//   console.log('📦 Cloudinary storage configured with parameters:', {
//     folder: 'softee',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
//     transformation: '500x500 limit'
//   });
} catch (error) {
  console.error('❌ Cloudinary Connection Error:', error.message);
  throw error;
}

export { storage };
export default cloudinary;
