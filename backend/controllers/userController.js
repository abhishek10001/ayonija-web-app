import userRoutes from './routes/user.js';
import Product from '../models/Product.js';
import Job from '../models/Job.js';

app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/jobs', jobRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/user', userRoutes);

// Get all products (public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

// Get all jobs (public)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching jobs', error: error.message });
  }
};
