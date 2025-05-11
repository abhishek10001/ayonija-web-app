import express from 'express';
import { 
    getJob, 
    getJobs, 
    createJob, 
    updateJob, 
    deleteJob,
    getJobApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
} from '../controllers/jobController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);

// Job applications routes (admin only)
router.get('/applications', verifyAdmin, getJobApplications);
router.get('/applications/:id', verifyAdmin, getApplicationById);
router.put('/applications/:id/status', verifyAdmin, updateApplicationStatus);
router.delete('/applications/:id', verifyAdmin, deleteApplication);

// Protected routes (admin only)
router.post('/', verifyAdmin, createJob);
router.get('/:id', getJob);
router.put('/:id', verifyAdmin, updateJob);
router.delete('/:id', verifyAdmin, deleteJob);

export default router; 