import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-green-600 text-white font-bold p-2 rounded">
                <span>PH</span>
              </div>
              <span className="ml-2 text-xl font-bold">PharmaHealth</span>
            </div>
            <p className="text-gray-600 text-sm">
              Providing quality healthcare products and solutions to improve lives worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@pharmahealth.com" className="text-sm hover:text-green-600">info@pharmahealth.com</a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <a href="tel:+15551234567" className="text-sm hover:text-green-600">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">123 Pharma Street, Health City, HC 12345</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Facebook size={18} className="text-gray-600" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Twitter size={18} className="text-gray-600" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Instagram size={18} className="text-gray-600" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Linkedin size={18} className="text-gray-600" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Youtube size={18} className="text-gray-600" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">All Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Prescription Medicines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">OTC Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Medical Devices</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Research & Development</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">News & Media</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Sustainability</a></li>
            </ul>
          </div>

          {/* Support and Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 mb-8">
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 text-sm">Site Map</a></li>
            </ul>

           
          </div>

          <div>
          <h3 className="font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-600 text-sm mb-3">Stay updated with our latest products, health tips, and company news.</p>
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
          <p className="text-gray-600 text-sm">© 2025 PharmaHealth. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;