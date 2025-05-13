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
  FiUser,
  FiTrash2,
  FiPlus
} from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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
          Ayonija Admin 
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { adminToken, setAdminToken, admins, getAllAdmins, createAdmin, deleteAdmin } = useContext(AdminContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isSettingsOpen) {
      getAllAdmins();
    }
  }, [isSettingsOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/admin/signout`, {}, {
        headers: { adminToken }
      });
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      localStorage.removeItem('adminToken');
      setAdminToken('');
      navigate('/admin/login');
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const success = await createAdmin(newAdmin);
    if (success) {
      setIsAddAdminOpen(false);
      setNewAdmin({
        name: '',
        email: '',
        password: '',
        role: 'admin'
      });
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      await deleteAdmin(id);
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
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="w-8 h-8 rounded-full bg-primary-std text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <span className="text-sm font-medium">A</span>
                </button>
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

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Admin Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-neutral-std hover:text-neutral-dark"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setIsAddAdminOpen(true)}
                  className="flex items-center px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Add New Admin
                </button>
              </div>

              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin._id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{admin.name}</h3>
                      <p className="text-sm text-neutral-std">{admin.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {isAddAdminOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Admin</h2>
                <button
                  onClick={() => setIsAddAdminOpen(false)}
                  className="text-neutral-std hover:text-neutral-dark"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-std mb-1">Name</label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-std mb-1">Email</label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-std mb-1">Password</label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-std mb-1">Role</label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddAdminOpen(false)}
                    className="px-4 py-2 text-neutral-std hover:text-neutral-dark"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
