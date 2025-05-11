import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  FiPackage, 
  FiPlusCircle, 
  FiBriefcase, 
  FiUsers, 
  FiMail, 
  FiMenu, 
  FiX,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiSearch,
  FiBell,
  FiUser
} from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: <FiGrid size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FiPackage size={20} />, label: 'Listed Products' },
    { path: '/admin/products/add', icon: <FiPlusCircle size={20} />, label: 'Add Product' },
    { path: '/admin/jobs', icon: <FiBriefcase size={20} />, label: 'Job Postings' },
    { path: '/admin/jobs/add', icon: <FiPlusCircle size={20} />, label: 'Add Job' },
    { path: '/admin/applications', icon: <FiUsers size={20} />, label: 'Job Applications' },
    { path: '/admin/subscribers', icon: <FiMail size={20} />, label: 'Newsletter Subscribers' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50
        ${isOpen ? 'w-72' : 'w-0 -translate-x-full'} lg:translate-x-0 lg:w-72`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-neutral-light">
          <h1 className="text-xl font-bold text-primary-std flex items-center">
            <div className="bg-primary-std text-white p-2 rounded-lg mr-2">
              <FiGrid size={20} />
            </div>
            Admin Portal
          </h1>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-neutral-std hover:text-neutral-dark"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 border border-primary-std pr-4 py-2 bg-neutral-50 text-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std text-sm"
            />
            <FiSearch className="absolute left-3 top-2.5 text-neutral-std" size={18} />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3">
          <div className="px-3">
            <h3 className="text-xs font-semibold text-neutral-std uppercase tracking-wider">Main</h3>
          </div>
          {menuItems.slice(0, 1).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 
                ${location.pathname === item.path 
                  ? 'text-primary-std bg-primary-light' 
                  : 'text-neutral-std hover:text-primary-std hover:bg-primary-light/50'}`}
            >
              <span className={`mr-3 ${location.pathname === item.path ? 'text-primary-std' : 'text-neutral-std'}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-2 px-3">
            <h3 className="text-xs font-semibold text-neutral-std uppercase tracking-wider">Products</h3>
          </div>
          {menuItems.slice(1, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 
                ${location.pathname === item.path 
                  ? 'text-primary-std bg-primary-light' 
                  : 'text-neutral-std hover:text-primary-std hover:bg-primary-light/50'}`}
            >
              <span className={`mr-3 ${location.pathname === item.path ? 'text-primary-std' : 'text-neutral-std'}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-2 px-3">
            <h3 className="text-xs font-semibold text-neutral-std uppercase tracking-wider">Careers</h3>
          </div>
          {menuItems.slice(3, 6).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 
                ${location.pathname === item.path 
                  ? 'text-primary-std bg-primary-light' 
                  : 'text-neutral-std hover:text-primary-std hover:bg-primary-light/50'}`}
            >
              <span className={`mr-3 ${location.pathname === item.path ? 'text-primary-std' : 'text-neutral-std'}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="mb-2 mt-2 px-3">
            <h3 className="text-xs font-semibold text-neutral-std uppercase tracking-wider">Marketing</h3>
          </div>
          {menuItems.slice(6).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 
                ${location.pathname === item.path 
                  ? 'text-primary-std bg-primary-light' 
                  : 'text-neutral-std hover:text-primary-std hover:bg-primary-light/50'}`}
            >
              <span className={`mr-3 ${location.pathname === item.path ? 'text-primary-std' : 'text-neutral-std'}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-neutral-light p-4 mt-auto">
          <div className="bg-neutral-50 p-3 rounded-lg mb-2">
            <div className="flex items-center">
              <div className="bg-primary-light text-primary-std p-2 rounded-lg">
                <FiUser size={18} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-dark">Admin User</p>
                <p className="text-xs text-neutral-std">admin@example.com</p>
              </div>
              <div className="ml-auto">
                <FiSettings size={18} className="text-neutral-std hover:text-neutral-dark cursor-pointer" />
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-neutral-std hover:text-primary-std transition-colors duration-200 rounded-lg hover:bg-primary-light/50"
          >
            <FiLogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/admin/signout`, {}, {
        headers: { adminToken }
      });
    } catch (error) {
      // Even if the request fails, proceed to clear local state
      console.error('Error signing out:', error);
    } finally {
      localStorage.removeItem('adminToken');
      setAdminToken('');
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      
      <div className={`lg:ml-72 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-neutral-std hover:text-neutral-dark mr-4"
              >
                <FiMenu size={24} />
              </button>
              <div className="text-lg font-semibold text-neutral-dark">Welcome, Admin</div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-neutral-std hover:text-neutral-dark hover:bg-neutral-50 rounded-full">
                <FiBell size={20} />
              </button>
              <div className="h-8 w-px bg-neutral-light"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-std text-white flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-light p-6 text-center text-sm text-neutral-std">
          <p>© 2025 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
