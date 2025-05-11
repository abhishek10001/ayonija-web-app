// import { getAuth } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebaseConfig';

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const verifyAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token provided'
//       });
//     }

//     const token = authHeader.split('Bearer ')[1];
    
//     // Verify the token
//     const decodedToken = await auth.verifyIdToken(token);
    
//     // Check if the email is in the allowed list
//     const allowedAdminEmails = [
//       'admin@example.com',
//       'superadmin@example.com'
//     ];

//     if (!allowedAdminEmails.includes(decodedToken.email)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized access'
//       });
//     }

//     // Add the decoded token to the request object
//     req.admin = decodedToken;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(401).json({
//       success: false,
//       message: 'Invalid token',
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   verifyAdmin
// };

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const verifyAdmin = async (req, res, next) => {
    try {
        // Get token from adminToken header
        const token = req.headers.admintoken; // Note: headers are lowercased in Node.js
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find admin by id
        const admin = await Admin.findById(decoded.id).select('-password');
        
        if (!admin) {
            return res.status(403).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Add the admin info to the request object
        req.admin = {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role
        };
        
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please login again.'
            });
        }
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};