import { useState } from 'react';
import { Shield, Check, Briefcase, Mail } from 'lucide-react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Add authentication logic here
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get the Google ID token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idToken = credential.idToken;
      
      // Send the token to your backend
      const response = await fetch('http://localhost:5000/api/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Admin sign in successful:', data);
        // Store the token in localStorage for protected routes
        localStorage.setItem('adminToken', data.token);
        // Redirect to the admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 border border-gray-300 rounded shadow-sm transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="text-center mt-6">
            <a href="/" className="text-green-600 hover:text-green-800 text-sm font-bold ">Click here to Go Back</a>
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