import React, { useState, useEffect, useContext } from 'react';
import { 
  FiSearch, 
  FiMail, 
  FiCalendar,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2
} from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const { newsletterSubscribers, getNewsletterSubscribers, loading } = useContext(AdminContext);

  useEffect(() => {
    getNewsletterSubscribers().catch(err => setError('Failed to load subscribers'));
  }, []);

  // Pagination
  const pageSize = 10;
  const filteredSubscribers = newsletterSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedSubscribers = filteredSubscribers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Here you would make an API call to delete the subscriber
    setShowDeleteModal(false);
    setSelectedSubscriber(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark">Newsletter Subscribers</h1>
        <p className="text-neutral-std mt-1">Manage your newsletter subscribers</p>
      </div>

      {/* Search and Export */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-std" size={20} />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
            />
          </div>

          {/* Export Button */}
          <button
            className="inline-flex items-center px-4 py-2 border border-neutral-light rounded-lg text-primary-std hover:bg-primary-light transition-colors duration-200"
          >
            <FiDownload className="mr-2" size={18} />
            Export Subscribers
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Subscriber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-std uppercase tracking-wider">Subscribed Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-std uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light">
              {loading ? (
                <tr><td colSpan={3} className="text-center py-8">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={3} className="text-center text-alert-error py-8">{error}</td></tr>
              ) : paginatedSubscribers.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-8">No subscribers found.</td></tr>
              ) : paginatedSubscribers.map((subscriber) => (
                <tr key={subscriber._id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                          <FiMail className="text-primary-std" size={20} />
                        </div>
                      </div>
                      <div className="ml-4">
                        {/* <div className="text-sm font-medium text-neutral-dark">
                          {subscriber.name || 'Anonymous'}
                        </div> */}
                        <div className="text-sm text-neutral-std">{subscriber.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-neutral-std">
                      <FiCalendar className="mr-2" size={16} />
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(subscriber)}
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
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, filteredSubscribers.length)}</span> of{' '}
            <span className="font-medium">{filteredSubscribers.length}</span> subscribers
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
              disabled={currentPage * pageSize >= filteredSubscribers.length}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-neutral-dark mb-4">
              Delete Subscriber
            </h3>
            <p className="text-neutral-std mb-6">
              Are you sure you want to remove {selectedSubscriber.email} from the newsletter subscribers?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSubscriber(null);
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

export default Subscribers; 