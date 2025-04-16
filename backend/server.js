import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.js';
import connectDB from './config/mongodb.js';
import './config/cloudinary.js'; // Just import to initialize, don't call it

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Add cookie parser for authentication

// Routes
app.use('/api/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API WORKING');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})