import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [adminToken, setAdminToken] = useState(
        localStorage.getItem("adminToken") || ""
    );
    const [dashData, setDashData] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobApplications, setJobApplications] = useState([]);
    const [totalApplications, setTotalApplications] = useState(0);
    const [postedJobs, setPostedJobs] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Create axios instance with default config
    const api = axios.create({
        baseURL: backendUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Add request interceptor to add auth token
    api.interceptors.request.use(
        (config) => {
            if (adminToken) {
                config.headers.adminToken = adminToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor to handle common errors
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                setAdminToken('');
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            }
            return Promise.reject(error);
        }
    );

    // Product API calls
    const getAllProducts = async () => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return;
            }

            const response = await api.get('/api/admin/products');
            
            if (response.data.success) {
                const productsData = response.data.data.products;
                setProducts(productsData);
                toast.success('Products loaded successfully');
            } else {
                toast.error(response.data.message || 'Failed to load products');
            }
        } catch (error) {
            console.error('Error in getAllProducts:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const getProduct = useCallback(async (id) => {
        try {
            if (!adminToken) {
                toast.error('Please login first');
                return null;
            }

            const response = await api.get(`/api/admin/products/${id}`);
            
            if (response.data.success) {
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Failed to load product');
                return null;
            }
        } catch (error) {
            console.error('Error in getProduct:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch product');
            return null;
        }
    }, [adminToken, api]);

    const createProduct = async (productData) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.post('/api/admin/products/addproducts', productData);
            
            if (response.data.success) {
                toast.success('Product created successfully');
                await getAllProducts(); // Refresh the products list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to create product');
                return false;
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(error.response?.data?.message || 'Failed to create product');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.put(`/api/admin/products/addproducts/${id}`, productData);
            
            if (response.data.success) {
                toast.success('Product updated successfully');
                await getAllProducts(); // Refresh the products list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to update product');
                return false;
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error(error.response?.data?.message || 'Failed to update product');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.delete(`/api/admin/products/addproducts/${id}`);
            
            if (response.data.success) {
                toast.success('Product deleted successfully');
                await getAllProducts(); // Refresh the products list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to delete product');
                return false;
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // File upload API call
    const uploadImage = async (file) => {
        try {
            if (!adminToken) {
                toast.error('Please login first');
                return null;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/api/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                return response.data.data.url;
            } else {
                toast.error(response.data.message || 'Failed to upload image');
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(error.response?.data?.message || 'Failed to upload image');
            return null;
        }
    };

    // Job API calls
    const getJobApplications = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return { applications: [], pagination: { total: 0, pages: 0 } };
            }

            const response = await api.get(`/api/admin/jobs/applications?page=${page}&limit=${limit}`);
            
            if (response.data.success) {
                const applications = response.data.data.applications;
                const pagination = response.data.data.pagination;
                setJobApplications(applications);
                setTotalApplications(pagination.total);
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Failed to load job applications');
                return { applications: [], pagination: { total: 0, pages: 0 } };
            }
        } catch (error) {
            console.error('Error in getJobApplications:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch job applications');
            return { applications: [], pagination: { total: 0, pages: 0 } };
        } finally {
            setLoading(false);
        }
    };

    const getApplicationById = async (applicationId) => {
        try {
            if (!adminToken) {
                toast.error('Please login first');
                return null;
            }

            const response = await api.get(`/api/admin/jobs/applications/${applicationId}`);
            
            if (response.data.success) {
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Failed to load application');
                return null;
            }
        } catch (error) {
            console.error('Error in getApplicationById:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch application');
            return null;
        }
    };

    const updateApplicationStatus = async (applicationId, status) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.put(`/api/admin/jobs/applications/${applicationId}/status`, { status });
            
            if (response.data.success) {
                toast.success('Application status updated successfully');
                await getJobApplications(); // Refresh the applications list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to update application status');
                return false;
            }
        } catch (error) {
            console.error('Error updating application status:', error);
            toast.error(error.response?.data?.message || 'Failed to update application status');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteApplication = async (applicationId) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.delete(`/api/admin/jobs/applications/${applicationId}`);
            
            if (response.data.success) {
                toast.success('Application deleted successfully');
                await getJobApplications(); // Refresh the applications list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to delete application');
                return false;
            }
        } catch (error) {
            console.error('Error deleting application:', error);
            toast.error(error.response?.data?.message || 'Failed to delete application');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getPostedJobs = useCallback(async () => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return [];
            }

            const response = await api.get('/api/admin/jobs');
            
            if (response.data.success) {
                const jobsData = response.data.data;
                setPostedJobs(jobsData);
                return jobsData;
            } else {
                toast.error(response.data.message || 'Failed to load posted jobs');
                return [];
            }
        } catch (error) {
            console.error('Error in getPostedJobs:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch posted jobs');
            return [];
        } finally {
            setLoading(false);
        }
    }, [adminToken, api]);

    // Add new job management functions
    const createJob = async (jobData) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.post('/api/admin/jobs', jobData);
            
            if (response.data.success) {
                toast.success('Job posted successfully');
                await getPostedJobs(); // Refresh the jobs list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to create job posting');
                return false;
            }
        } catch (error) {
            console.error('Error creating job:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create job posting';
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async (id, jobData) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.put(`/api/admin/jobs/${id}`, jobData);
            
            if (response.data.success) {
                toast.success('Job updated successfully');
                await getPostedJobs(); // Refresh the jobs list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to update job posting');
                return false;
            }
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error(error.response?.data?.message || 'Failed to update job posting');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (id) => {
        try {
            setLoading(true);
            if (!adminToken) {
                toast.error('Please login first');
                return false;
            }

            const response = await api.delete(`/api/admin/jobs/${id}`);
            
            if (response.data.success) {
                toast.success('Job deleted successfully');
                await getPostedJobs(); // Refresh the jobs list
                return true;
            } else {
                toast.error(response.data.message || 'Failed to delete job posting');
                return false;
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error(error.response?.data?.message || 'Failed to delete job posting');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        products,
        loading,
        dashData,
        jobApplications,
        totalApplications,
        postedJobs,
        // Product API calls
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        // File upload
        uploadImage,
        // Job API calls
        getJobApplications,
        getApplicationById,
        updateApplicationStatus,
        deleteApplication,
        getPostedJobs,
        createJob,
        updateJob,
        deleteJob,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;

