import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const benefits = [
    "Latest research insights",
    "Industry news updates",
    "Exclusive offers",
    "Company announcements"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setStatus({ type: 'success', message: 'Thank you for subscribing!' });
    setEmail('');
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-neutral-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                Stay Informed About<br />
                Research & Innovation
              </h2>
              <p className="text-neutral-std mb-8">
                Subscribe to our newsletter and receive the latest updates on our research, 
                industry insights, exclusive offers, and company news.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-light/30 flex items-center justify-center mr-3">
                      <FiCheck className="text-primary-std" size={12} />
                    </div>
                    <span className="text-neutral-std">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-std" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-std/20 focus:border-primary-std transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 bg-primary-std text-white py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium"
                >
                  Subscribe Now
                </button>
                <p className="text-xs text-neutral-std mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from AYONIJA RESEARCH SOLUTIONS. 
                  You can unsubscribe at any time.
                </p>
              </form>
              
              {status.message && (
                <div className={`mt-4 p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
