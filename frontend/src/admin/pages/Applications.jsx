import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiMail, 
  FiDownload,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';

const Applications = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Dummy data - replace with your actual data
  const applications = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      jobTitle: 'Clinical Pharmacist',
      appliedDate: '2024-03-15',
      status: 'Under Review',
      coverLetter: 'I am writing to express my strong interest...',
      documentLinks: 'https://drive.google.com/file/xyz',
    },
    // Add more applications...
  ];

  const statuses = ['all', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'];

  const filteredApplications = applications.filter(app => 
    (selectedStatus === 'all' || app.status === selectedStatus) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

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
                <tr key={application.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-dark">{application.name}</div>
                    <div className="text-xs text-neutral-std">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">{application.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-std">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      application.status === 'Under Review' ? 'bg-primary-light text-primary-std' :
                      application.status === 'Shortlisted' ? 'bg-secondary-light text-secondary-std' :
                      application.status === 'Hired' ? 'bg-alert-success/10 text-alert-success' :
                      'bg-alert-error/10 text-alert-error'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-primary-std hover:text-primary-dark mr-3"
                    >
                      <FiEye size={18} />
                    </button>
                    <a
                      href={`mailto:${application.email}`}
                      className="text-primary-std hover:text-primary-dark mr-3"
                    >
                      <FiMail size={18} />
                    </a>
                    <a
                      href={application.documentLinks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-std hover:text-primary-dark"
                    >
                      <FiDownload size={18} />
                    </a>
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
            <span className="font-medium">{filteredApplications.length}</span> results
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
                For {selectedApplication.jobTitle}
              </p>
            </div>

            <div className="space-y-6">
              {/* Applicant Info */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Applicant Information</h4>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedApplication.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedApplication.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Applied:</span> {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Cover Letter</h4>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-line">
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              </div>

              {/* Document Links */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Documents</h4>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <a
                    href={selectedApplication.documentLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-std hover:text-primary-dark inline-flex items-center"
                  >
                    <FiDownload className="mr-2" size={16} />
                    View Documents
                  </a>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="text-sm font-medium text-neutral-dark mb-2">Update Status</h4>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => {
                    // Here you would update the application status
                    console.log('Status updated:', e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
                >
                  {statuses.filter(status => status !== 'all').map(status => (
                    <option key={status} value={status}>
                      {status}
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