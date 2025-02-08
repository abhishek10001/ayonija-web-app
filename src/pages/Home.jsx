import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Pinnacle Life Sciences</h1>
          <p className="text-xl mb-8">Your trusted partner in pharmaceutical innovation and excellence.</p>
          <a href="/about-us" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300">
            Learn More
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src="/path-to-about-image.jpg" alt="About Us" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <p className="text-lg mb-4">
                Pinnacle Life Sciences is a leading pharmaceutical company dedicated to delivering high-quality products and services. Our commitment to innovation and excellence drives us to meet the needs of our clients and patients worldwide.
              </p>
              <a href="/about-us" className="text-blue-600 hover:text-blue-800 font-semibold">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Research & Development</h3>
              <p className="text-gray-700">Innovative research and development to bring new solutions to market.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Manufacturing</h3>
              <p className="text-gray-700">State-of-the-art manufacturing facilities ensuring quality and efficiency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Regulatory Support</h3>
              <p className="text-gray-700">Comprehensive regulatory support to navigate complex requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg mb-8">We'd love to hear from you. Reach out to us for any inquiries or collaborations.</p>
          <a href="/contact-us" className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;