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


import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
import { allowedAdminEmails } from '../constants/adminList.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split('Bearer ')[1];
        
        // Verify the token
        const decodedToken = await auth.verifyIdToken(token);
        
        // Check if the email is in the allowed list
        if (!allowedAdminEmails.includes(decodedToken.email)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        // Add the decoded token to the request object
        req.admin = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

export { verifyAdmin };