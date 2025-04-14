import React from 'react';
import { FiActivity, FiSearch, FiHeart, FiUsers } from 'react-icons/fi';

const WhyAyonija = () => {
  const features = [
    {
      icon: <FiActivity className="text-green-500 w-8 h-8" />,
      title: "Quality Assurance",
      description: "All our products undergo rigorous quality testing and meet international standards."
    },
    {
      icon: <FiSearch className="text-green-500 w-8 h-8" />, // Changed from FiMicroscope to FiSearch
      title: "Research & Innovation",
      description: "Continuous investment in research to develop innovative healthcare solutions."
    },
    {
      icon: <FiHeart className="text-green-500 w-8 h-8" />,
      title: "Healthcare Expertise",
      description: "Our team includes healthcare professionals with extensive industry experience."
    },
    {
      icon: <FiUsers className="text-green-500 w-8 h-8" />,
      title: "Customer Focused",
      description: "Dedicated to improving patient outcomes and healthcare professional satisfaction."
    }
  ];

  return (
    <section className="py-16 px-6 max-w-9xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Ayonija?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are committed to excellence in pharmaceutical products, research, and customer service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAyonija;