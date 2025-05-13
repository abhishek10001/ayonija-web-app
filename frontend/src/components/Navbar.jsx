import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleloginClick = () => {
    setIsOpen(false);
    navigate('/admin/login');
  };

  const handleDropdownHover = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdown(mobileDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const dropdownItems = {
    products: [
      { title: 'All Products', path: '/products', description: 'Browse our extensive range of pharmaceutical products' },
      { title: 'Medications', path: '/products/medications', description: 'Browse our extensive range of prescription and OTC medications' },
      { title: 'Medical Devices', path: '/products/devices', description: 'High-quality medical equipment and devices for healthcare' },
      { title: 'Supplements', path: '/products/supplements', description: 'Natural supplements and vitamins for better health' }
    ],
    careers: [
      { title: 'Current Openings', path: '/carriers', description: 'Explore exciting career opportunities with us' },
      { title: 'Benefits', path: '/carriers/benefits', description: 'Discover our comprehensive employee benefits package' },
      { title: 'Our Culture', path: '/carriers/culture', description: 'Learn about our inclusive and innovative workplace' }
    ],
    company: [
      { title: 'About Us', path: '/about', description: 'Our mission, vision, and commitment to healthcare' },
      { title: 'Our Team', path: '/about/team', description: 'Meet the experts behind our success' },
      { title: 'News', path: '/about/news', description: 'Latest updates and announcements from PharmaHealth' }
    ]
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and company name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className={`transition-colors duration-300 ${
                  isScrolled ? 'bg-green-600/90' : 'bg-green-600'
                } text-white font-bold p-2 rounded`}>
                  <span>PH</span>
                </div>
                <span className="ml-2 text-xl font-bold">Ayonija</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-white hover:bg-green-600/90 px-3 py-2 rounded-lg transition-all duration-300 font-medium">
              Home
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownHover('products')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-gray-900 hover:text-white hover:bg-green-600/90 px-3 py-2 rounded-lg transition-all duration-300 font-medium flex items-center">
                Products
                <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className={`absolute z-[100] bg-white/90 backdrop-blur-md shadow-lg rounded-xl py-2 w-72 transform transition-all duration-300 ${activeDropdown === 'products' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                {dropdownItems.products.map((item, index) => (
                  <Link key={index} to={item.path} className="block px-4 py-3 hover:bg-green-50/90 transition-colors duration-200">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownHover('careers')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-gray-900 hover:text-white hover:bg-green-600/90 px-3 py-2 rounded-lg transition-all duration-300 font-medium flex items-center">
                Careers
                <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className={`absolute z-[100] bg-white/90 backdrop-blur-md shadow-lg rounded-xl py-2 w-72 transform transition-all duration-300 ${activeDropdown === 'careers' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                {dropdownItems.careers.map((item, index) => (
                  <Link key={index} to={item.path} className="block px-4 py-3 hover:bg-green-50/90 transition-colors duration-200">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownHover('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-gray-900 hover:text-white hover:bg-green-600/90 px-3 py-2 rounded-lg transition-all duration-300 font-medium flex items-center">
                Company
                <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className={`absolute z-[100] bg-white/90 backdrop-blur-md shadow-lg rounded-xl py-2 w-72 transform transition-all duration-300 ${activeDropdown === 'company' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                {dropdownItems.company.map((item, index) => (
                  <Link key={index} to={item.path} className="block px-4 py-3 hover:bg-green-50/90 transition-colors duration-200">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/contact" className="text-gray-900 hover:text-white hover:bg-green-600/90 px-3 py-2 rounded-lg transition-all duration-300 font-medium">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin login removed */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-700 hover:text-white hover:bg-green-600/90 p-2 rounded-md transition-all duration-300"
              onClick={toggleMenu}
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white/90 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 pt-5 pb-3 space-y-1">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <div className="bg-green-600 text-white font-bold p-2 rounded">
                  <span>PH</span>
                </div>
                <span className="ml-2 text-xl font-bold">PharmaHealth</span>
              </Link>
              <button 
                className="text-gray-700 hover:text-white hover:bg-green-600 p-2 rounded-md transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <Link to="/" className="block px-3 py-3 text-gray-900 hover:text-white hover:bg-green-600 rounded-md transition-all duration-300 font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            
            {Object.entries(dropdownItems).map(([key, items]) => (
              <div key={key} className="block">
                <button 
                  className="w-full flex justify-between items-center px-3 py-3 text-gray-900 hover:text-white hover:bg-green-600 rounded-md transition-all duration-300 font-medium"
                  onClick={() => toggleDropdown(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <FiChevronDown className={`transition-transform duration-300 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === key ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="pl-4 space-y-1 py-2">
                    {items.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.path}
                        className="block px-3 py-2 text-gray-800 hover:bg-green-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/contact" className="block px-3 py-3 text-gray-900 hover:text-white hover:bg-green-600 rounded-md transition-all duration-300 font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between px-3">
                {/* Admin login removed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;