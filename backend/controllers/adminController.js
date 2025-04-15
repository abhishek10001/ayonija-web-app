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


import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
import { allowedAdminEmails } from '../constants/adminList.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle admin sign-in with Google
export const handleAdminSignIn = async (req, res) => {
    try {
        const { idToken } = req.body;
        
        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: 'No authentication token provided'
            });
        }
        
        // Verify the Google ID token
        const credential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, credential);
        const user = result.user;
        
        console.log('User authenticated:', user.email);
        
        // Check if the email is in the allowed list
        if (!allowedAdminEmails.includes(user.email)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized email address'
            });
        }

        // Get a new ID token to use for session
        const token = await user.getIdToken();

        res.status(200).json({
            success: true,
            message: 'Admin authenticated successfully',
            user: {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL
            },
            token
        });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

// Handle sign out
export const handleSignOut = async (req, res) => {
    try {
        await auth.signOut();
        res.status(200).json({
            success: true,
            message: 'Signed out successfully'
        });
    } catch (error) {
        console.error('Error signing out:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to sign out',
            error: error.message
        });
    }
};

// Check current admin session
export const checkAdminSession = async (req, res) => {
  try {
    // The middleware should have added admin info to req
    if (req.admin) {
      res.status(200).json({
        success: true,
        message: 'Admin session is valid',
        user: {
          email: req.admin.email,
          name: req.admin.name,
          photoURL: req.admin.picture
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'No active session'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check session',
      error: error.message
    });
  }
};