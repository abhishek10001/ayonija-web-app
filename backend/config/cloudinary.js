import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let storage;

try {
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
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Use HTTPS
  });

  // Test the connection
  cloudinary.api.ping()
    .then(() => console.log('✅ Cloudinary Connected'))
    .catch(error => {
      console.error('❌ Cloudinary Connection Test Failed:', error);
      throw new Error('Failed to connect to Cloudinary');
    });

  // Configure storage with more options
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'softee', // Change to your project name
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' }, // Larger size for better quality
        { quality: 'auto' }, // Automatic quality optimization
        { fetch_format: 'auto' } // Automatic format optimization
      ],
      resource_type: 'auto', // Allow all resource types
      use_filename: true, // Use original filename
      unique_filename: true, // Add unique suffix to filename
      overwrite: false // Don't overwrite existing files
    }
  });

  console.log('📦 Cloudinary storage configured successfully');
} catch (error) {
  console.error('❌ Cloudinary Configuration Error:', error.message);
  throw error;
}

export { storage };
export default cloudinary;
