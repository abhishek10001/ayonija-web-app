import express from 'express';
import { 
    getJob, 
    getJobs, 
    createJob, 
    updateJob, 
    deleteJob 
} from '../controllers/job.controller.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes (admin only)
router.post('/', verifyAdmin, createJob);
router.put('/:id', verifyAdmin, updateJob);
router.delete('/:id', verifyAdmin, deleteJob);

export default router; 