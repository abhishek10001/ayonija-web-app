import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJob, updateJob, loading } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    location: '',
    salary: '',
    type: 'full-time',
    department: '',
    deadline: '',
    isActive: true
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await getJob(id);
        if (job) {
          setFormData({
            title: job.title || '',
            description: job.description || '',
            requirements: job.requirements || '',
            responsibilities: job.responsibilities || '',
            location: job.location || '',
            salary: job.salary || '',
            type: job.type || 'full-time',
            department: job.department || '',
            deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
            isActive: job.status === 'active'
          });
        }
      } catch (error) {
        setError('Failed to load job');
        toast.error('Failed to load job');
      }
    };

    fetchJob();
  }, [id, getJob]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!formData.department.trim()) {
      setError('Department is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Job description is required');
      return false;
    }
    if (!formData.requirements.trim()) {
      setError('Job requirements are required');
      return false;
    }
    if (!formData.responsibilities.trim()) {
      setError('Job responsibilities are required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Job location is required');
      return false;
    }
    if (!formData.salary.trim()) {
      setError('Salary range is required');
      return false;
    }
    if (!formData.deadline) {
      setError('Application deadline is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const jobData = {
        ...formData,
        status: formData.isActive ? 'active' : 'inactive'
      };

      const success = await updateJob(id, jobData);

      if (success) {
        toast.success('Job updated successfully!');
        navigate('/admin/jobs');
      } else {
        throw new Error('Failed to update job posting');
      }
    } catch (err) {
      setError(err.message || 'Failed to update job posting');
      toast.error(err.message || 'Failed to update job posting');
      console.error('Error updating job:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-std"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-dark">Edit Job</h1>
        <button
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center text-neutral-std hover:text-neutral-dark"
        >
          <FiX className="mr-1" />
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-alert-error/10 text-alert-error rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Job Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g., $120,000 - $150,000 per year"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-std mb-2">
              Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-std focus:ring-primary-std border-neutral-light rounded"
              />
              <span className="ml-2 text-sm text-neutral-std">Active</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            required
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            required
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-neutral-std mb-2">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-std"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/jobs')}
            className="px-4 py-2 text-sm font-medium text-neutral-std hover:text-neutral-dark border border-neutral-light rounded-lg hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-std rounded-lg hover:bg-primary-dark flex items-center disabled:opacity-50"
          >
            <FiSave className="mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob; 