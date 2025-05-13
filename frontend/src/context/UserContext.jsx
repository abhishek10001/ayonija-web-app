import { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userToken, setUserToken] = useState(
        localStorage.getItem("userToken") || ""
    );
    const [loading, setLoading] = useState(false);
    const [userApplications, setUserApplications] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Create axios instance with default config
    const api = axios.create({
        baseURL: backendUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Add request interceptor to add auth token
    // api.interceptors.request.use(
    //     (config) => {
    //         if (userToken) {
    //             config.headers.userToken = userToken;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    // // Add response interceptor to handle common errors
    // api.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if (error.response?.status === 401) {
    //             setUserToken('');
    //             localStorage.removeItem('userToken');
    //             window.location.href = '/login';
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    // Job Application API calls
    const applyForJob = async (jobId, applicationData) => {
        try {
            setLoading(true);
            if (!userToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.post(`/api/jobs/${jobId}/apply`, applicationData);
            
            if (response.data.success) {
                toast.success('Application submitted successfully');
                await getUserApplications(); // Refresh the applications list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to submit application');
                return false;
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error(error.response?.data?.message || 'Failed to submit application');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getUserApplications = async () => {
        try {
            setLoading(true);
            if (!userToken) {
                toast.error('Please login first');
                return;
            }

            const response = await api.get('/api/user/applications');
            
            if (response.data.success) {
                setUserApplications(response.data.data.applications);
                return response.data.data.applications;
            } else {
                toast.error(response.data.message || 'Failed to load applications');
                return [];
            }
        } catch (error) {
            console.error('Error in getUserApplications:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch applications');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getApplicationStatus = async (applicationId) => {
        try {
            if (!userToken) {
                toast.error('Please login first');
                return null;
            }

            const response = await api.get(`/api/user/applications/${applicationId}`);
            
            if (response.data.success) {
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Failed to load application status');
                return null;
            }
        } catch (error) {
            console.error('Error in getApplicationStatus:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch application status');
            return null;
        }
    };

    const withdrawApplication = async (applicationId) => {
        try {
            setLoading(true);
            if (!userToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.delete(`/api/user/applications/${applicationId}`);
            
            if (response.data.success) {
                toast.success('Application withdrawn successfully');
                await getUserApplications(); // Refresh the applications list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to withdraw application');
                return false;
            }
        } catch (error) {
            console.error('Error withdrawing application:', error);
            toast.error(error.response?.data?.message || 'Failed to withdraw application');
            return false;
        } finally {
            setLoading(false);
        }
    };
    const getJobs = async () => {
        
    };

    const value = {
        userToken,
        setUserToken,
        loading,
        userApplications,
        // Job Application API calls
        applyForJob,
        getUserApplications,
        getApplicationStatus,
        withdrawApplication,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider; 