import { useState, useEffect, useContext } from 'react';
import { Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { setAdminToken } = useContext(AdminContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setCheckingAuth(false);
          return;
        }

        const response = await axios.get(`${backendUrl}/api/admin/verify`, {
          headers: { adminToken: token }
        });
        
        if (response.data.success) {
          navigate('/admin/dashboard');
        } else {
          localStorage.removeItem('adminToken');
          setCheckingAuth(false);
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${backendUrl}/api/admin/signin`, {
        email,
        password
      });
      
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem('adminToken', token);
        setAdminToken(token);
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.response?.data?.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mb-4">
            <Shield size={28} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Checking authentication...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left panel - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Access Only</h1>
            <p className="text-gray-600 mt-2">Sign in with your administrator credentials</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/" className="text-green-600 hover:text-green-800 text-sm font-bold">Click here to Go Back</a>
          </div>
        </div>
      </div>

      {/* Right panel - Features */}
      <div className="hidden md:flex md:w-1/2 bg-white p-10 items-center">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Administrator Access</h2>
          <p className="text-gray-600 text-lg mb-8">
            Welcome to the PharmaHealth admin portal. This area is restricted to authorized personnel only.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-800">Manage Products</h3>
                <p className="text-gray-600">Add, edit, and remove pharmaceutical products from the catalog.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-800">Job Listings</h3>
                <p className="text-gray-600">Post new job openings and manage applications.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-800">Newsletter & Subscribers</h3>
                <p className="text-gray-600">Manage newsletter content and subscriber lists.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}