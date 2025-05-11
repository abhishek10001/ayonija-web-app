import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/product.js';
import jobRoutes from './routes/jobroutes.js';
import uploadRoutes from './routes/upload.js';
import { handleMulterError } from './middlewares/upload.js';
import connectDB from './config/mongodb.js';

// Load environment variables first
dotenv.config();

// Debug: Log environment variables
console.log('Server Environment Variables Check:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);

// Import routes and config after environment variables are loaded
import './config/cloudinary.js';

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'adminToken']
}));
app.use(cookieParser()); // Add cookie parser for authentication

// Debug route registration
console.log('Registering routes...');

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/jobs', jobRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Debug route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API WORKING',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Multer error handler
app.use(handleMulterError);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:5173');
  console.log('Available routes:');
  console.log('- GET /api/products');
  console.log('- GET /api/products/:id');
  console.log('- POST /api/products');
  console.log('- PUT /api/products/:id');
  console.log('- DELETE /api/products/:id');
});