import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-green-600 text-white font-bold p-2 rounded">
                <span>ARS</span>
              </div>
              <span className="ml-2 text-xl font-bold">AYONIJA RESEARCH SOLUTIONS</span>
            </div>
            <p className="text-gray-600 text-sm">
              Providing quality research solutions and services to improve lives worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <a href="mailto:contact@ayonijars.com" className="text-sm hover:text-green-600">contact@ayonijars.com</a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <a href="tel:+911234567890" className="text-sm hover:text-green-600">+91 1234567890</a>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">8-3-169/2K, Plot No-2, Siddhartha Nagar, Sanjeev Reddy Nagar, Ameerpet, Hyderabad- 500038, Telangana</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com/ayonijars" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Facebook size={18} className="text-gray-600" />
              </a>
              <a href="https://twitter.com/ayonijars" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Twitter size={18} className="text-gray-600" />
              </a>
              <a href="https://instagram.com/ayonijars" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Instagram size={18} className="text-gray-600" />
              </a>
              <a href="https://linkedin.com/company/ayonijars" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Linkedin size={18} className="text-gray-600" />
              </a>
              <a href="https://youtube.com/ayonijars" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Youtube size={18} className="text-gray-600" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/services')} className="text-gray-600 hover:text-green-600 text-sm">All Services</button></li>
              <li><button onClick={() => handleNavigation('/services/research')} className="text-gray-600 hover:text-green-600 text-sm">Research Services</button></li>
              <li><button onClick={() => handleNavigation('/services/consulting')} className="text-gray-600 hover:text-green-600 text-sm">Consulting</button></li>
              <li><button onClick={() => handleNavigation('/services/analysis')} className="text-gray-600 hover:text-green-600 text-sm">Data Analysis</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/about')} className="text-gray-600 hover:text-green-600 text-sm">About Us</button></li>
              <li><button onClick={() => handleNavigation('/research')} className="text-gray-600 hover:text-green-600 text-sm">Research & Development</button></li>
              <li><button onClick={() => handleNavigation('/careers')} className="text-gray-600 hover:text-green-600 text-sm">Careers</button></li>
              <li><button onClick={() => handleNavigation('/news')} className="text-gray-600 hover:text-green-600 text-sm">News & Media</button></li>
              <li><button onClick={() => handleNavigation('/sustainability')} className="text-gray-600 hover:text-green-600 text-sm">Sustainability</button></li>
            </ul>
          </div>

          {/* Support and Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 mb-8">
              <li><button onClick={() => handleNavigation('/contact')} className="text-gray-600 hover:text-green-600 text-sm">Contact Us</button></li>
              <li><button onClick={() => handleNavigation('/faq')} className="text-gray-600 hover:text-green-600 text-sm">FAQs</button></li>
              <li><button onClick={() => handleNavigation('/privacy')} className="text-gray-600 hover:text-green-600 text-sm">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation('/terms')} className="text-gray-600 hover:text-green-600 text-sm">Terms of Service</button></li>
              <li><button onClick={() => handleNavigation('/sitemap')} className="text-gray-600 hover:text-green-600 text-sm">Site Map</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-600 text-sm mb-3">Stay updated with our latest research, services, and company news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-r p-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} AYONIJA RESEARCH SOLUTIONS PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button onClick={() => handleNavigation('/privacy')} className="text-gray-600 hover:text-green-600 text-sm">Privacy Policy</button>
            <button onClick={() => handleNavigation('/terms')} className="text-gray-600 hover:text-green-600 text-sm">Terms of Service</button>
            <button onClick={() => handleNavigation('/sitemap')} className="text-gray-600 hover:text-green-600 text-sm">Site Map</button>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <Link 
              to="/admin/login"
              onClick={scrollToTop}
              className="text-gray-600 hover:text-green-600 text-sm font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;