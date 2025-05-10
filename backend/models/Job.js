import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Job type is required'],
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        default: 'full-time'
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    requirements: {
        type: String,
        required: [true, 'Job requirements are required']
    },
    responsibilities: {
        type: String,
        required: [true, 'Job responsibilities are required']
    },
    salary: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'draft', 'closed'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job; 