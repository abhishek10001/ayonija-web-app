import express from 'express';

import { handleAdminSignIn, handleSignOut } from '../controllers/adminController.js';
import { verifyAdmin } from '../middlewares/auth.js';

// Public routes
const adminRouter = express.Router();
adminRouter.post('/signin', handleAdminSignIn);
adminRouter.post('/signout', handleSignOut);

// Protected routes (require admin authentication)
adminRouter.use(verifyAdmin);

// Add protected admin routes here
// Example:
// router.get('/dashboard', adminController.getDashboard);
// router.post('/products', adminController.createProduct);
// etc.

export default adminRouter;