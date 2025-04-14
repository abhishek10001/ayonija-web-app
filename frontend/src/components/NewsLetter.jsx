import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const benefits = [
    "New product announcements",
    "Seasonal health advisories",
    "Special discount offers",
    "Health management resources"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                Health & Wellness
              </h2>
              <p className="text-neutral-std mb-8">
                Subscribe to our newsletter and receive the latest updates on our products, 
                health tips, exclusive offers, and educational resources.
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
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-std/20 focus:border-primary-std transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-std/20 focus:border-primary-std transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-std text-white py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium"
                >
                  Subscribe Now
                </button>
                <p className="text-xs text-neutral-std mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from PharmaHealth. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
