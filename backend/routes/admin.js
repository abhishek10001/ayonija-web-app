import express from 'express';

import { handleAdminSignIn, handleSignOut, verify, getAllAdmins, createAdmin, deleteAdmin, getMessages } from '../controllers/adminController.js';
import { verifyAdmin } from '../middlewares/auth.js';

// Public routes
const adminRouter = express.Router();
adminRouter.post('/signin', handleAdminSignIn);
adminRouter.post('/signout', handleSignOut);
adminRouter.get('/verify', verify);

// Protected routes (require admin authentication)
adminRouter.use(verifyAdmin);

// Admin management routes
adminRouter.get('/admins', getAllAdmins);
adminRouter.post('/admins', createAdmin);
adminRouter.delete('/admins/:id', deleteAdmin);
adminRouter.get('/messages', getMessages);

// Add protected admin routes here
// Example:
// router.get('/dashboard', adminController.getDashboard);
// router.post('/products', adminController.createProduct);
// etc.

export default adminRouter;