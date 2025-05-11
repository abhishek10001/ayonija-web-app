import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  documentLinks: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
applicationSchema.index({ jobId: 1, email: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ appliedAt: -1 });

export const Application = mongoose.model('Application', applicationSchema); 