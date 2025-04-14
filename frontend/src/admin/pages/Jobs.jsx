import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiBriefcase,
  FiMapPin,
  FiX
} from 'react-icons/fi';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Dummy data - replace with your actual data
  const jobs = [
    {
      id: 1,
      title: 'Clinical Pharmacist',
      type: 'Full-Time',
      location: 'New York, NY',
      department: 'Pharmacy',
      postedDate: '2024-03-15',
      deadline: '2024-04-15',
      status: 'Active',
      applications: 12,
    },
    {
      id: 2,
      title: 'Pharmacy Technician',
      type: 'Part-Time',
      location: 'Los Angeles, CA',
      department: 'Pharmacy',
      postedDate: '2024-03-10',
      deadline: '2024-04-10',
      status: 'Active',
      applications: 8,
    },
    // Add more jobs...
  ];

  const jobTypes = ['all', 'Full-Time', 'Part-Time', 'Contract'];

  const filteredJobs = jobs.filter(job =>
    (selectedType === 'all' || job.type === selectedType) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Here you would make an API call to delete the job
    console.log('Deleting job:', selectedJob);
    setShowDeleteModal(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Job Postings</h1>
          <p className="text-neutral-std mt-1">Manage your job postings</p>
        </div>
        <Link
          to="/admin/jobs/add"
          className="inline-flex items-center px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          <FiPlus className="mr-2" size={20} />
          Add New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-std" size={20} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          {/* Job Type Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-neutral-std" size={20} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-neutral-light rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-std focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Job Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-std uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                          <FiBriefcase className="text-primary-std" size={20} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-dark">{job.title}</div>
                        <div className="text-sm text-neutral-std flex items-center mt-1">
                          <FiMapPin className="mr-1" size={14} />
                          {job.location}
                        </div>
                        <div className="text-xs text-neutral-std mt-1">
                          <span className="inline-flex items-center">
                            <FiCalendar className="mr-1" size={12} />
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{job.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'Active' ? 'bg-alert-success/10 text-alert-success' : 'bg-alert-error/10 text-alert-error'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/applications?job=${job.id}`}
                      className="text-sm text-primary-std hover:text-primary-dark"
                    >
                      {job.applications} applications
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/jobs/edit/${job.id}`}
                      className="text-primary-std hover:text-primary-dark mr-3"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(job)}
                      className="text-alert-error hover:text-alert-error-dark"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-neutral-light">
          <div className="text-sm text-neutral-std">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">{filteredJobs.length}</span> jobs
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-neutral-light transition-colors duration-200"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-neutral-light transition-colors duration-200"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-neutral-dark mb-4">
              Delete Job Posting
            </h3>
            <p className="text-neutral-std mb-6">
              Are you sure you want to delete "{selectedJob.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedJob(null);
                }}
                className="px-4 py-2 border border-neutral-light rounded-lg text-neutral-std hover:bg-neutral-light transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-alert-error text-white rounded-lg hover:bg-alert-error-dark transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs; 