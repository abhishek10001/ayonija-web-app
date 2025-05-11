import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Jobs = () => {
  const navigate = useNavigate();
  const { postedJobs, loading, getPostedJobs, deleteJob, adminToken } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const jobTypes = ['all', 'full-time', 'part-time', 'contract', 'internship'];

  useEffect(() => {
    const fetchJobs = async () => {
      if (!adminToken) return;
      try {
        await getPostedJobs();
      } catch (error) {
        setError('Failed to load jobs');
        toast.error('Failed to load jobs');
      } finally {
        setIsInitialLoad(false);
      }
    };

    if (isInitialLoad) {
      fetchJobs();
    }
  }, [adminToken, getPostedJobs, isInitialLoad]);

  const filteredJobs = postedJobs.filter(job =>
    (selectedType === 'all' || job.type === selectedType) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (job) => {
    navigate(`/admin/jobs/edit/${job._id}`);
  };

  const handleDelete = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const success = await deleteJob(selectedJob._id);
      if (success) {
        toast.success('Job deleted successfully');
        setShowDeleteModal(false);
        setSelectedJob(null);
        // Refresh jobs after deletion
        await getPostedJobs();
      }
    } catch (error) {
      toast.error('Failed to delete job');
      setError('Failed to delete job');
    }
  };

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

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-std" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="text-neutral-std" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
          >
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-light">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-std uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light">
              {filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-neutral-50">
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
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{job.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'active' ? 'bg-alert-success/10 text-alert-success' : 'bg-alert-error/10 text-alert-error'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-primary-std hover:text-primary-dark"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="text-alert-error hover:text-alert-error-dark"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-neutral-dark mb-4">
              Delete Job Posting
            </h3>
            <p className="text-neutral-std mb-6">
              Are you sure you want to delete the job posting "{selectedJob?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-std hover:text-neutral-dark border border-neutral-light rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-alert-error rounded-lg hover:bg-alert-error-dark"
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