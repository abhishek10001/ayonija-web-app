
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, User, AtSign, ChevronRight, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('message'); // 'message' or 'faq'
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    }, 2000);
  };

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer standard (3-5 business days), express (1-2 business days), and next-day delivery options. Shipping costs vary based on location and selected method."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account to view order status and tracking details."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Products must be unopened and in original packaging. Contact our customer service team to initiate a return process."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select international destinations. Additional fees and longer delivery times may apply. Check our shipping policy for eligible countries."
    }
  ];

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white">
      {/* Header Section with Parallax Effect */}
      <div className="bg-gradient-to-r from-primary-std to-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute left-0 top-0 h-64 w-64 text-white opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M42.7,-73.2C56.1,-67.3,68.2,-57.2,75.2,-44.1C82.3,-31,84.3,-15.5,83.2,-0.6C82.1,14.2,77.8,28.4,70.4,41.3C63,54.2,52.4,65.8,39.1,71.7C25.8,77.6,9.8,77.8,-5.8,76.1C-21.3,74.5,-36.3,71,-48.4,63C-60.5,55.1,-69.7,42.8,-75.2,29C-80.8,15.2,-82.7,-0.1,-79.3,-13.8C-75.9,-27.5,-67.1,-39.7,-56,-48.5C-45,-57.4,-31.6,-63,-18.6,-68.4C-5.6,-73.8,6.9,-78.9,19.8,-79.6C32.7,-80.3,46,-78.6,53.8,-72.4Z" transform="translate(100 100)" />
          </svg>
          
          <svg className="absolute right-0 bottom-0 h-96 w-96 text-white opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M46.3,-78.9C59.9,-71.1,70.8,-58.5,77.5,-44.2C84.3,-29.9,87,-14,86.1,1.7C85.3,17.3,81,32.7,73.1,45.9C65.3,59.2,54,70.3,40.7,77.3C27.3,84.3,11.7,87.1,-3.4,86.8C-18.5,86.4,-37,82.9,-51.5,74.3C-66,65.8,-76.5,52.2,-82.3,37.3C-88.2,22.3,-89.5,6,-87.4,-9.7C-85.3,-25.5,-79.9,-40.8,-70.2,-53.3C-60.5,-65.8,-46.5,-75.4,-32.1,-80.4C-17.7,-85.3,-2.9,-85.6,11.2,-83.3C25.3,-81,40.7,-76.2,53.6,-68.7" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="px-4 py-1 bg-white/20 text-white text-sm rounded-full inline-block mb-6">REACH OUT TO US</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch With Our Team</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Have questions about our products or services? Our knowledgeable team is ready
              to assist you with any inquiries and provide the support you need.
            </p>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pb-16">
        {/* Quick Contact Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="tel:+15551234567" className="flex items-center gap-2 bg-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all group">
            <div className="bg-primary-std/10 p-2 rounded-full group-hover:bg-primary-std transition-colors">
              <Phone className="h-4 w-4 text-primary-std group-hover:text-white" />
            </div>
            <span className="font-medium text-neutral-dark">(555) 123-4567</span>
          </a>
          
          <a href="mailto:info@pharmahealth.com" className="flex items-center gap-2 bg-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all group">
            <div className="bg-primary-std/10 p-2 rounded-full group-hover:bg-primary-std transition-colors">
              <Mail className="h-4 w-4 text-primary-std group-hover:text-white" />
            </div>
            <span className="font-medium text-neutral-dark">info@pharmahealth.com</span>
          </a>
          
          <div className="flex items-center gap-2 bg-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all group">
            <div className="bg-primary-std/10 p-2 rounded-full group-hover:bg-primary-std transition-colors">
              <MapPin className="h-4 w-4 text-primary-std group-hover:text-white" />
            </div>
            <span className="font-medium text-neutral-dark">123 Pharma Street, Health City</span>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md inline-flex">
            <button 
              onClick={() => setActiveTab('message')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'message' 
                  ? 'bg-primary-std text-white' 
                  : 'text-neutral-dark hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Contact Us
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'faq' 
                  ? 'bg-primary-std text-white' 
                  : 'text-neutral-dark hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                FAQs
              </span>
            </button>
          </div>
        </div>

        {activeTab === 'message' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information - Left Column */}
            <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 transform hover:translate-y-1 transition-transform duration-300">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-dark mb-3 flex items-center">
                    <div className="h-8 w-1 bg-primary-std rounded-full mr-3"></div>
                    Contact Details
                  </h2>
                  <p className="text-neutral-std text-sm">
                    Reach out through any of these channels for assistance:
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-primary-std/10 p-3 rounded-xl group-hover:bg-primary-std group-hover:text-white transition-all duration-300">
                      <Phone className="h-5 w-5 text-primary-std group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Phone Support</h3>
                      <a href="tel:+15551234567" className="text-neutral-std hover:text-primary-std block transition-colors text-sm">
                        Customer Service: (555) 123-4567
                      </a>
                      <a href="tel:+15559876543" className="text-neutral-std hover:text-primary-std block transition-colors text-sm">
                        Medical Support: (555) 987-6543
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-primary-std/10 p-3 rounded-xl group-hover:bg-primary-std group-hover:text-white transition-all duration-300">
                      <Mail className="h-5 w-5 text-primary-std group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Email Inquiries</h3>
                      <a href="mailto:info@pharmahealth.com" className="text-neutral-std hover:text-primary-std block transition-colors text-sm">
                        General: info@pharmahealth.com
                      </a>
                      <a href="mailto:support@pharmahealth.com" className="text-neutral-std hover:text-primary-std block transition-colors text-sm">
                        Support: support@pharmahealth.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-primary-std/10 p-3 rounded-xl group-hover:bg-primary-std group-hover:text-white transition-all duration-300">
                      <MapPin className="h-5 w-5 text-primary-std group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Visit Our Office</h3>
                      <address className="text-neutral-std not-italic text-sm">
                        123 Pharma Street<br />
                        Health City, HC 12345<br />
                        United States
                      </address>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-primary-std/10 p-3 rounded-xl group-hover:bg-primary-std group-hover:text-white transition-all duration-300">
                      <Clock className="h-5 w-5 text-primary-std group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Business Hours</h3>
                      <div className="space-y-0.5">
                        <p className="text-neutral-std text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-neutral-std text-sm">Saturday: 10:00 AM - 2:00 PM</p>
                        <p className="text-neutral-std text-sm">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Global Presence */}
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-primary-std/10 p-3 rounded-xl group-hover:bg-primary-std group-hover:text-white transition-all duration-300">
                      <Globe className="h-5 w-5 text-primary-std group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Global Presence</h3>
                      <div className="text-neutral-std text-sm">
                        With offices in New York, London, Singapore and Sydney, we provide 24/7 international support.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Column (spans 2 columns) */}
            <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 col-span-1 lg:col-span-2 transform hover:translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="h-8 w-1 bg-primary-std rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-neutral-dark">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1.5 group-focus-within:text-primary-std transition-colors">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-neutral-std" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-neutral-200 focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all text-sm"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1.5 group-focus-within:text-primary-std transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AtSign className="h-4 w-4 text-neutral-std" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-neutral-200 focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all text-sm"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Subject Input */}
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-dark mb-1.5 group-focus-within:text-primary-std transition-colors">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all text-sm"
                      placeholder="What's your inquiry about?"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-1.5 group-focus-within:text-primary-std transition-colors">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-std focus:ring-2 focus:ring-primary-std/20 outline-none transition-all resize-none text-sm"
                      placeholder="Please share the details of your inquiry so we can better assist you..."
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Form Status */}
                {formStatus.message && (
                  <div className={`p-4 rounded-lg flex items-center space-x-3 text-sm ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {formStatus.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p>{formStatus.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary-std text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary-std/20 text-sm shadow-md hover:shadow-lg"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {isSubmitting ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                  
                  <span className="text-xs text-neutral-std">We usually respond within 24 hours</span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* FAQ Section */
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 transform hover:translate-y-1 transition-transform duration-300">
            <div className="flex items-center mb-8">
              <div className="h-8 w-1 bg-primary-std rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold text-neutral-dark">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-neutral-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <h3 className="text-lg font-medium text-neutral-dark mb-2 flex items-start gap-3">
                    <div className="bg-primary-std/10 p-1 rounded-full text-primary-std">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-neutral-std ml-9">{faq.answer}</p>
                </div>
              ))}
              
              <div className="bg-neutral-50 rounded-xl p-6 mt-8">
                <p className="text-center text-neutral-dark mb-4">
                  Didn't find the answer you were looking for?
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveTab('message')}
                    className="bg-primary-std text-white font-medium py-2.5 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg"
                  >
                    <span>Contact Our Support Team</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="mt-8 rounded-2xl overflow-hidden h-[400px] bg-white shadow-md transform hover:translate-y-1 transition-transform duration-300">
          <div className="w-full h-full bg-neutral-100 relative">
            {/* Replace this div with your map component */}
            <div className="w-full h-full flex items-center justify-center text-neutral-std">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary-std animate-bounce" />
                <p className="text-lg font-medium text-neutral-dark">Our Location</p>
                <p className="text-sm">123 Pharma Street, Health City, HC 12345</p>
                <button className="mt-4 px-4 py-2 bg-primary-std text-white rounded-lg text-sm hover:bg-primary-dark transition-all">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* "Back to top" button that appears when scrolled */}
        {scrolled && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-primary-std text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
      </div>
    <Footer />
    </>
  );
};

export default Contact;