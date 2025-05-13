import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

export const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema); 