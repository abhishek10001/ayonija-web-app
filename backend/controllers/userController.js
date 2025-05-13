import Product from '../models/Product.js';
import Job from '../models/Job.js';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';
import nodemailer from 'nodemailer';
import { ContactMessage } from '../models/ContactMessage.js';

// Get all products (public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

// Get all jobs (public)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching jobs', error: error.message });
  }
};

// Newsletter subscription
export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }
        // Check for duplicate
        const existing = await NewsletterSubscriber.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email is already subscribed.' });
        }
        const subscriber = new NewsletterSubscriber({ email });
        await subscriber.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: `AYONIJA RESEARCH SOLUTIONS <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Thank you for subscribing to our newsletter!',
            html: `<p>Hi there,</p>
                   <p>Thank you for subscribing to the AYONIJA RESEARCH SOLUTIONS newsletter!</p>
                   <p>You will now receive updates on our latest research, industry news, and exclusive offers.</p>
                   <p>If you did not subscribe, please ignore this email.</p>
                   <br/>
                   <p>Best regards,<br/>AYONIJA RESEARCH SOLUTIONS Team</p>`
        });

        res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ success: false, message: 'Error subscribing to newsletter', error: error.message });
    }
};

export const getNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching subscribers', error: error.message });
  }
};

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const contactMessage = new ContactMessage({ name, email, subject, message });
    await contactMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};