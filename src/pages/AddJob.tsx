import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiDollarSign, FiClock, FiTag, FiFileText } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import categoriesData from '../data/categories.json';
import Swal from 'sweetalert2';

const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    deliveryTime: '',
    category: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a job provider
  React.useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to login to post jobs.',
        icon: 'info',
        confirmButtonColor: '#00B8C6'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (user.role === 'job_seeker') {
      Swal.fire({
        title: 'Access Denied',
        text: 'Only job providers can post jobs.',
        icon: 'warning',
        confirmButtonColor: '#00B8C6'
      }).then(() => {
        navigate('/');
      });
      return;
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push('Job title is required');
    if (!formData.budget.trim()) errors.push('Budget is required');
    if (!formData.deliveryTime.trim()) errors.push('Delivery time is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (formData.description.length < 50) errors.push('Description must be at least 50 characters');

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      Swal.fire({
        title: 'Validation Error',
        html: errors.map(error => `• ${error}`).join('<br>'),
        icon: 'error',
        confirmButtonColor: '#00B8C6'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Your job has been posted successfully.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 3000,
        showConfirmButton: true
      }).then(() => {
        navigate('/my-jobs');
      });
      setIsSubmitting(false);
    }, 1000);
  };

  if (!user || user.role === 'job_seeker') {
    return null; // Prevent flash of content
  }

  return (
    <Layout
      title="Post a Job - Micro Freelance"
      description="Post your job requirements and find the perfect freelancer for your project."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Post a New Job
          </h1>
          <p className="text-xl text-base-content/70">
            Tell us about your project and find the perfect freelancer
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold flex items-center">
                  <FiBriefcase className="w-5 h-5 mr-2 text-primary" />
                  Job Title *
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Build a responsive landing page"
                className="input input-bordered input-lg w-full"
                maxLength={100}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  {formData.title.length}/100 characters
                </span>
              </label>
            </div>

            {/* Budget and Delivery Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center">
                    <FiDollarSign className="w-5 h-5 mr-2 text-success" />
                    Budget *
                  </span>
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., $500"
                  className="input input-bordered input-lg w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center">
                    <FiClock className="w-5 h-5 mr-2 text-warning" />
                    Delivery Time *
                  </span>
                </label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="select select-bordered select-lg w-full"
                >
                  <option value="">Select delivery time</option>
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="5 days">5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold flex items-center">
                  <FiTag className="w-5 h-5 mr-2 text-secondary" />
                  Category *
                </span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered select-lg w-full"
              >
                <option value="">Select a category</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-info" />
                  Project Description *
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your project in detail. Include requirements, expectations, and any specific skills needed..."
                className="textarea textarea-bordered textarea-lg w-full h-40 resize-none"
                maxLength={2000}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  {formData.description.length}/2000 characters (minimum 50 characters)
                </span>
              </label>
            </div>

            {/* Guidelines */}
            <div className="alert alert-info">
              <div>
                <h3 className="font-bold">Guidelines for posting jobs:</h3>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Be clear and specific about your requirements</li>
                  <li>Set a realistic budget and timeline</li>
                  <li>Provide detailed project descriptions</li>
                  <li>Choose the most appropriate category</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-ghost btn-lg"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting Job...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddJob;