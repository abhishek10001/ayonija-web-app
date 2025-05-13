import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

const BecomePartner = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-primary-std to-primary-dark py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Become a AYONIJA RESEARCH SOLUTIONS Partner
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Are you looking to partner with a reliable research solutions provider? 
              Join our network of partners for exclusive benefits, competitive pricing, and priority access to our services.
            </p>
          </div>
          
          <Link 
            to="/contact"
            onClick={handleClick}
            className="inline-flex items-center px-6 py-3 bg-white text-primary-std rounded-full hover:bg-primary-light transition-colors duration-300 group"
          >
            <FiClock className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
            <span className="font-medium">Become a Partner</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BecomePartner;
