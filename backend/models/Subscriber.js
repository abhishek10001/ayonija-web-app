import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

module.exports = mongoose.model('Subscriber', subscriberSchema); 