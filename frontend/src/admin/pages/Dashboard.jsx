import React from "react";
import {
  FiPackage,
  FiBriefcase,
  FiUsers,
  FiMail,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";

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
  const stats = [
    {
      icon: <FiPackage size={24} />,
      label: "Products",
      value: "124",
      trend: "+12.5%",
    },
    {
      icon: <FiBriefcase size={24} />,
      label: "Job Postings",
      value: "15",
      trend: "+5.2%",
    },
    {
      icon: <FiUsers size={24} />,
      label: "Applications",
      value: "48",
      trend: "+18.7%",
    },
    {
      icon: <FiMail size={24} />,
      label: "Subscribers",
      value: "2,845",
      trend: "+8.1%",
    },
  ];

  const recentActivities = [
    {
      type: "product",
      title: 'New product "Pain Relief Gel" added',
      time: "2 hours ago",
    },
    {
      type: "job",
      title: 'New job posting for "Clinical Pharmacist"',
      time: "4 hours ago",
    },
    {
      type: "application",
      title: 'New application for "Sales Manager"',
      time: "5 hours ago",
    },
    {
      type: "subscriber",
      title: "New newsletter subscriber",
      time: "6 hours ago",
    },
    {
      type: "product",
      title: 'Product "Vitamin C" updated',
      time: "8 hours ago",
    },
  ];

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
