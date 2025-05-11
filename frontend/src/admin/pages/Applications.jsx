import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiMail, 
  FiDownload,
  FiEye,
  FiX
} from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Applications = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  const { getJobApplications, updateApplicationStatus, loading } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const statuses = ['pending', 'shortlisted', 'rejected', 'hired', 'under review', 'accepted'];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getJobApplications(1, 1000); // Fetch all applications
        if (response && response.applications) {
          setApplications(response.applications);
        }
        setIsInitialLoad(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
      }
    };

    if (isInitialLoad) {
      fetchApplications();
    }
  }, [getJobApplications, isInitialLoad]);

  const filteredApplications = applications.filter(app => {
    if (!app) return false;
    
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = !searchTerm || (
      (app.applicantName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (app.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    
    return matchesStatus && matchesSearch;
  });

  const handleViewApplication = (application) => {
    if (!application) return;
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    if (!applicationId || !newStatus) return;
    
    try {
      const success = await updateApplicationStatus(applicationId, newStatus);
      if (success) {
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  if (loading && isInitialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark">Job Applications</h1>
        <p className="text-neutral-std mt-1">Review and manage job applications</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-std" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-neutral-std" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-neutral-light rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-std focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-std uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light">
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-dark">{application.name || 'N/A'}</div>
                    <div className="text-xs text-neutral-std">{application.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{application.jobTitle || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">
                      {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={application.status || 'pending'}
                      onChange={e => handleStatusUpdate(application._id, e.target.value)}
                      className="px-2 py-1 text-xs font-medium rounded-full border focus:outline-none"
                      style={{
                        background:
                          application.status === 'pending'
                            ? '#D1FAE5'
                            : application.status === 'shortlisted'
                            ? '#E0E7FF'
                            : application.status === 'hired'
                            ? '#DCFCE7'
                            : application.status === 'under review'
                            ? '#FEF9C3'
                            : application.status === 'accepted'
                            ? '#BBF7D0'
                            : '#FEE2E2',
                        color:
                          application.status === 'pending'
                            ? '#10B981'
                            : application.status === 'shortlisted'
                            ? '#6366F1'
                            : application.status === 'hired'
                            ? '#22C55E'
                            : application.status === 'under review'
                            ? '#F59E42'
                            : application.status === 'accepted'
                            ? '#15803D'
                            : '#EF4444',
                      }}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-primary-std hover:text-primary-dark mr-3"
                    >
                      <FiEye size={18} />
                    </button>
                    {application.email && (
                      <a
                        href={`mailto:${application.email}`}
                        className="text-primary-std hover:text-primary-dark mr-3"
                      >
                        <FiMail size={18} />
                      </a>
                    )}
                    {application.resumeUrl && (
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-std hover:text-primary-dark"
                      >
                        <FiDownload size={18} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button
              onClick={() => setShowApplicationModal(false)}
              className="absolute top-4 right-4 text-neutral-std hover:text-neutral-dark transition-colors duration-300"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
                Application Details
              </h3>
              <p className="text-neutral-std">
                For {selectedApplication.jobTitle || 'N/A'}
              </p>
            </div>

            <div className="space-y-6">
              {/* Applicant Info */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Applicant Information</h4>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedApplication.applicantName || 'N/A'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedApplication.email || 'N/A'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Applied:</span> {selectedApplication.appliedAt ? new Date(selectedApplication.appliedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Cover Letter</h4>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-line">
                    {selectedApplication.coverLetter || 'No cover letter provided'}
                  </p>
                </div>
              </div>

              {/* Resume */}
              {selectedApplication.resumeUrl && (
                <div>
                  <h4 className="text-sm font-medium text-neutral-dark mb-2">Resume</h4>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-std hover:text-primary-dark inline-flex items-center"
                    >
                      <FiDownload className="mr-2" size={16} />
                      View Resume
                    </a>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Update Status</h4>
                <select
                  value={selectedApplication.status || 'pending'}
                  onChange={(e) => handleStatusUpdate(selectedApplication._id, e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications; 