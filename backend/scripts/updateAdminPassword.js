import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const updateAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin
    const admin = await Admin.findOne({ email: process.env.ADMIN_Mail.toLowerCase() });
    
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    // Update password
    admin.password = process.env.ADMIN_Password;
    await admin.save();
    console.log('Admin password updated successfully');
    
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

updateAdminPassword(); 