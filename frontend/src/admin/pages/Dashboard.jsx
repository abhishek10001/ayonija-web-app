import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import {
  FiPackage,
  FiBriefcase,
  FiUsers,
  FiMail,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const StatCard = ({ icon, label, value, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-neutral-std text-sm">{label}</p>
        <h3 className="text-2xl font-semibold text-neutral-dark mt-1">
          {value}
        </h3>
      </div>
      <div
        className={`p-3 rounded-lg ${
          label === "Products"
            ? "bg-primary-light text-primary-std"
            : label === "Job Postings"
            ? "bg-secondary-light text-secondary-std"
            : label === "Applications"
            ? "bg-alert-success/10 text-alert-success"
            : "bg-alert-warning/10 text-alert-warning"
        }`}
      >
        {icon}
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-4 text-xs">
        <FiTrendingUp className="text-alert-success mr-1" />
        <span className="text-alert-success font-medium">{trend}</span>
        <span className="text-neutral-std ml-1">vs last month</span>
      </div>
    )}
  </div>
);

const RecentActivity = ({ type, title, time }) => (
  <div className="flex items-start space-x-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors duration-200">
    <div
      className={`p-2 rounded-lg ${
        type === "product"
          ? "bg-primary-light text-primary-std"
          : type === "job"
          ? "bg-secondary-light text-secondary-std"
          : type === "application"
          ? "bg-alert-success/10 text-alert-success"
          : "bg-alert-warning/10 text-alert-warning"
      }`}
    >
      {type === "product" ? (
        <FiPackage size={16} />
      ) : type === "job" ? (
        <FiBriefcase size={16} />
      ) : type === "application" ? (
        <FiUsers size={16} />
      ) : (
        <FiMail size={16} />
      )}
    </div>
    <div className="flex-1">
      <p className="text-sm text-neutral-dark font-medium">{title}</p>
      <div className="flex items-center mt-1 text-xs text-neutral-std">
        <FiClock size={12} className="mr-1" />
        {time}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { 
    products, 
    postedJobs, 
    jobApplications, 
    getAllProducts, 
    getPostedJobs, 
    getJobApplications,
    loading 
  } = useContext(AdminContext);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);

  // Utility functions
  const calculateTrend = (current, previous) => {
    if (previous === 0) return "+0%";
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Memoize the fetch function to prevent recreation on every render
  const fetchDashboardData = useCallback(async () => {
    if (!isInitialLoad) return;
    
    try {
      setError(null);
      await Promise.all([
        getAllProducts(),
        getPostedJobs(),
        getJobApplications()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, getAllProducts, getPostedJobs, getJobApplications]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Memoize stats calculation
  const stats = useMemo(() => [
    {
      icon: <FiPackage size={24} />,
      label: "Products",
      value: products.length.toString(),
      trend: calculateTrend(products.length, 0)
    },
    {
      icon: <FiBriefcase size={24} />,
      label: "Job Postings",
      value: postedJobs.length.toString(),
      trend: calculateTrend(postedJobs.length, 0)
    },
    {
      icon: <FiUsers size={24} />,
      label: "Applications",
      value: jobApplications.length.toString(),
      trend: calculateTrend(jobApplications.length, 0)
    },
    {
      icon: <FiMail size={24} />,
      label: "Subscribers",
      value: "2,845",
      trend: "+8.1%"
    }
  ], [products.length, postedJobs.length, jobApplications.length]);

  // Memoize recent activities calculation
  const recentActivities = useMemo(() => {
    const activities = [];

    // Add recent products
    const recentProducts = products.slice(0, 2);
    recentProducts.forEach(product => {
      activities.push({
        type: "product",
        title: `Product "${product.name}" ${product.createdAt === product.updatedAt ? 'added' : 'updated'}`,
        time: formatTimeAgo(product.updatedAt)
      });
    });

    // Add recent jobs
    const recentJobs = postedJobs.slice(0, 2);
    recentJobs.forEach(job => {
      activities.push({
        type: "job",
        title: `Job posting for "${job.title}"`,
        time: formatTimeAgo(job.createdAt)
      });
    });

    // Add recent applications
    const recentApplications = jobApplications.slice(0, 2);
    recentApplications.forEach(application => {
      activities.push({
        type: "application",
        title: `New application for "${application.jobId?.title || 'a job'}"`,
        time: formatTimeAgo(application.appliedAt)
      });
    });

    // Sort activities by time
    return activities.sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [products, postedJobs, jobApplications]);

  if (loading && isInitialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-alert-error p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark">Dashboard</h1>
        <p className="text-neutral-std mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-dark mb-4">
          Recent Activity
        </h2>
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <RecentActivity key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
