import Job from '../models/Job.js';
import { Application } from '../models/Application.js';

// Get a single job posting
export const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job posting not found'
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching job posting',
            error: error.message
        });
    }
};

// Get all job postings
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching job postings',
            error: error.message
        });
    }
};

// Create a new job posting
export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        
        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating job posting',
            error: error.message
        });
    }
};

// Update a job posting
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job posting not found'
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating job posting',
            error: error.message
        });
    }
};

// Delete a job posting
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job posting not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Job posting deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting job posting',
            error: error.message
        });
    }
};

// Get all job applications with pagination
export const getJobApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const applications = await Application.find()
            .populate('jobId', 'title')
            .sort({ appliedAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Application.countDocuments();
        const pages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: {
                applications,
                pagination: {
                    total,
                    page,
                    pages,
                    limit
                }
            }
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching job applications',
            error: error.message
        });
    }
};

// Get a single application
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('jobId', 'title');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching application',
            error: error.message
        });
    }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating application status',
            error: error.message
        });
    }
};

// Delete an application
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting application',
            error: error.message
        });
    }
};

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const { name, email, coverLetter, documentLinks } = req.body;
        const jobId = req.params.id;
        if (!name || !email || !coverLetter) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        const application = new Application({
            jobId,
            name,
            email,
            coverLetter,
            documentLinks: Array.isArray(documentLinks) ? documentLinks : [],
        });
        await application.save();
        res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ success: false, message: 'Error submitting application', error: error.message });
    }
}; 