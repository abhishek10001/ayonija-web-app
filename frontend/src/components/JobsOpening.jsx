import React, { useState, useEffect, useContext } from 'react';
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight, FiChevronUp, FiX, FiUpload, FiLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const JobsOpening = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getJobs, applyForJob } = useContext(UserContext);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    documentLinks: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 3);

  const handleToggleJobs = () => {
    setShowAllJobs(!showAllJobs);
  };

  const handleViewMore = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false);
    setApplicationData({
      name: '',
      email: '',
      coverLetter: '',
      documentLinks: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    const success = await applyForJob(selectedJob._id, applicationData);
    if (success) {
        alert('Application submitted successfully!');
        handleCloseApplicationForm();
    }
    // Optionally handle error feedback here
  };

  // Function to check if text is long enough to need truncation
  const isLongDescription = (text) => {
    return text.length > 100; // Adjusted to show "View More" for shorter text length
  };

  if (loading) {
    return (
      <div className="py-16 px-4 md:px-8 lg:px-12 max-w-9xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std mx-auto"></div>
          <p className="mt-4 text-neutral-std">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 md:px-8 lg:px-12 max-w-9xl mx-auto">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-16 px-4 md:px-8 lg:px-12 max-w-9xl mx-auto">
        <div className="text-center">
          <p className="text-neutral-std">No job openings available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 max-w-9xl mx-auto">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark">Career Opportunities</h2>
          <p className="text-neutral-std mt-2 max-w-2xl">
            Join our team and help us improve healthcare worldwide
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedJobs.map((job) => (
          <div 
            key={job._id}
            className="bg-white rounded-xl p-6 border border-neutral-light hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {/* Job Title and Type */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center text-sm text-neutral-std">
                  <FiBriefcase className="mr-2" />
                  {job.type}
                </div>
              </div>
              <span className="px-3 py-1 bg-primary-light text-primary-std text-sm font-medium rounded-full">
                {job.type}
              </span>
            </div>

            {/* Job Description */}
            <div className="flex-grow">
              <div className="relative mb-4">
                <p className="text-neutral-std text-sm line-clamp-3 h-[4.5rem] overflow-hidden leading-6">
                  {job.description}
                </p>
                {isLongDescription(job.description) && (
                  <button
                    onClick={() => handleViewMore(job)}
                    className="text-primary-std text-sm font-medium hover:text-primary-dark transition-colors duration-300 mt-2 inline-flex items-center"
                  >
                    View More
                    <FiArrowRight className="ml-1" size={14} />
                  </button>
                )}
              </div>

              {/* Location and Deadline */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-neutral-std">
                  <FiMapPin className="mr-2" size={16} />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-neutral-std">
                  <FiClock className="mr-2" size={16} />
                  Apply by {new Date(job.deadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-neutral-dark">Key Requirements:</div>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.split(', ').map((req, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-50 text-neutral-std text-xs rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-6">
              <button
                onClick={() => handleApplyNow(job)}
                className="inline-flex items-center px-4 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 text-sm font-medium  justify-center"
              >
                Apply Now
                <FiArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle View Button */}
      {jobs.length > 3 && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleToggleJobs}
            className="group flex items-center px-6 py-2.5 bg-white shadow-md rounded-lg border-2 border-primary-std hover:bg-primary-std transition-all duration-300"
          >
            <span className="text-primary-std group-hover:text-white font-medium text-sm">
              {showAllJobs ? 'Show Less Positions' : 'View All Positions'}
            </span>
            {showAllJobs ? (
              <FiChevronUp className="ml-2 text-primary-std group-hover:text-white" size={16} />
            ) : (
              <FiArrowRight className="ml-2 text-primary-std group-hover:text-white" size={16} />
            )}
          </button>
        </div>
      )}

      {/* Job Description Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-neutral-std hover:text-neutral-dark transition-colors duration-300"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
                {selectedJob.title}
              </h3>
              <div className="flex items-center text-sm text-neutral-std">
                <FiBriefcase className="mr-2" />
                {selectedJob.type}
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-neutral-std">
                {selectedJob.description}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-std hover:text-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button
              onClick={handleCloseApplicationForm}
              className="absolute top-4 right-4 text-neutral-std hover:text-neutral-dark transition-colors duration-300"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
                Apply for {selectedJob.title}
              </h3>
              <div className="flex items-center text-sm text-neutral-std">
                <FiBriefcase className="mr-2" />
                {selectedJob.type}
              </div>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={applicationData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={applicationData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Cover Letter Field */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-neutral-dark mb-2">
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent resize-none"
                  placeholder="Write your cover letter here..."
                />
              </div>

              {/* Document Links Field */}
              <div>
                <label htmlFor="documentLinks" className="block text-sm font-medium text-neutral-dark mb-2">
                  Document Links *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="text-neutral-std" size={16} />
                  </div>
                  <textarea
                    id="documentLinks"
                    name="documentLinks"
                    required
                    value={applicationData.documentLinks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-std focus:border-transparent resize-none"
                    placeholder="Paste your Google Drive or other document links here (CV, certificates, etc.)"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-std">
                  Please ensure the links are accessible and properly shared
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseApplicationForm}
                  className="px-6 py-2 border border-neutral-light text-neutral-dark rounded-lg hover:bg-neutral-light transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-std text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 inline-flex items-center"
                >
                  Submit Application
                  <FiUpload className="ml-2" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobsOpening; 