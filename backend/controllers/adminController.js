// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebaseConfig.js';
// import { allowedAdminEmails } from '../constants/adminList.js';

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// // Handle admin sign-in
// export const handleAdminSignIn = async (req, res) => {
//   try {
//       // This won't work directly in a backend route
//       // Google sign-in popup must be triggered from the frontend
//       // Backend should receive a token or auth code from frontend
      
//       const { idToken } = req.body;
      
//       if (!idToken) {
//           return res.status(400).json({
//               success: false,
//               message: 'No authentication token provided'
//           });
//       }
      
//       // Verify the token on the backend
//       const credential = GoogleAuthProvider.credential(idToken);
//       const result = await signInWithCredential(auth, credential);
//       const user = result.user;
      
//       // Check if the email is in the allowed list
//       if (!allowedAdminEmails.includes(user.email)) {
//           return res.status(403).json({
//               success: false,
//               message: 'Unauthorized email address'
//           });
//       }

//       // Get a new ID token
//       const token = await user.getIdToken();

//       res.status(200).json({
//           success: true,
//           message: 'Admin authenticated successfully',
//           user: {
//               email: user.email,
//               name: user.displayName,
//               photoURL: user.photoURL
//           },
//           token
//       });
//   } catch (error) {
//       console.error('Error during sign-in:', error);
//       res.status(500).json({
//           success: false,
//           message: 'Authentication failed',
//           error: error.message
//       });
//   }
// };

// // Handle sign out
// export const handleSignOut = async (req, res) => {
//     try {
//         await auth.signOut();
//         res.status(200).json({
//             success: true,
//             message: 'Signed out successfully'
//         });
//     } catch (error) {
//         console.error('Error signing out:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to sign out',
//             error: error.message
//         });
//     }
// };

// // Check current admin session
// export const checkAdminSession = async (req, res) => {
//   try {
//     // The middleware should have added admin info to req
//     if (req.admin) {
//       res.status(200).json({
//         success: true,
//         message: 'Admin session is valid',
//         user: {
//           email: req.admin.email,
//           name: req.admin.name,
//           photoURL: req.admin.picture
//         }
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: 'No active session'
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to check session',
//       error: error.message
//     });
//   }
// };

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ContactMessage } from '../models/ContactMessage.js';

// Handle admin sign-in
export const handleAdminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Debug log

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    console.log('Found admin:', admin ? 'Yes' : 'No'); // Debug log

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare password using bcrypt
    const isMatch = await admin.comparePassword(password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Token expires in 15 minutes
    );

    // Send token in response body instead of cookie
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        token // Include token in response
      }
    });
  } catch (error) {
    console.error('Error in admin signin:', error);
    res.status(500).json({
      success: false,
      message: 'Error signing in',
      error: error.message
    });
  }
};

export const handleSignOut = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('adminToken');
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Error in admin signout:', error);
    res.status(500).json({
      success: false,
      message: 'Error signing out',
      error: error.message
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Token is valid',
        data: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Error in verify:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token',
      error: error.message
    });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({
      success: true,
      data: admins
    });
  } catch (error) {
    console.error('Error getting admins:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: error.message
    });
  }
};

// Create new admin
export const createAdmin = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password,
      name,
      role: role || 'admin'
    });

    await admin.save();

    // Return admin without password
    const adminWithoutPassword = admin.toObject();
    delete adminWithoutPassword.password;

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: adminWithoutPassword
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (id === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const admin = await Admin.findByIdAndDelete(id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting admin',
      error: error.message
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};



