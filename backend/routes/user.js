import express from 'express';
import { getJobs, getJob, createJob, updateJob, deleteJob, getJobApplications, getApplicationById, updateApplicationStatus, deleteApplication, applyJob } from '../controllers/jobController.js';
import { getAllProducts } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';
import { subscribeNewsletter, getNewsletterSubscribers } from '../controllers/userController.js';
import { sendContactMessage } from '../controllers/userController.js';

const userRouter = express.Router();

// Job routes
userRouter.get('/jobs', getJobs);
userRouter.get('/jobs/:id', getJob);
userRouter.post('/jobs', auth, createJob);
userRouter.put('/jobs/:id', auth, updateJob);
userRouter.delete('/jobs/:id', auth, deleteJob);
userRouter.post('/jobs/:id/apply', applyJob);

// Application routes
userRouter.get('/applications', auth, getJobApplications);
userRouter.get('/applications/:id', auth, getApplicationById);
userRouter.put('/applications/:id/status', auth, updateApplicationStatus);
userRouter.delete('/applications/:id', auth, deleteApplication);

// Product routes
userRouter.get('/products', getAllProducts);

// Newsletter routes
userRouter.post('/newsletter/subscribe', subscribeNewsletter);
userRouter.post('/contact', sendContactMessage);
userRouter.get('/newsletter/subscribers', getNewsletterSubscribers);

export default userRouter;

