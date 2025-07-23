import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiFileText, FiClock, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import jobsData from '../data/jobs.json';
import Swal from 'sweetalert2';

const ApplyJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    coverLetter: '',
    deliveryTime: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const job = jobsData.find(j => j.id === parseInt(id || '0'));

  React.useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to login to apply for jobs.',
        icon: 'info',
        confirmButtonColor: '#00B8C6'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (user.role === 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'Admins cannot apply for jobs.',
        icon: 'warning',
        confirmButtonColor: '#00B8C6'
      }).then(() => {
        navigate('/');
      });
      return;
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.coverLetter.trim()) errors.push('Cover letter is required');
    if (formData.coverLetter.length < 100) errors.push('Cover letter must be at least 100 characters');
    if (!formData.deliveryTime) errors.push('Delivery time is required');
    if (!formData.budget.trim()) errors.push('Your proposed budget is required');

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
        title: 'Application Submitted!',
        text: 'Your application has been sent to the job provider. You will be notified if you are selected.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 3000,
        showConfirmButton: true
      }).then(() => {
        navigate('/jobs');
      });
      setIsSubmitting(false);
    }, 1000);
  };

  if (!job) {
    return (
      <Layout title="Job Not Found - Micro Freelance">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-base-content mb-4">Job Not Found</h1>
          <p className="text-base-content/70 mb-8">The job you're trying to apply for doesn't exist.</p>
          <Link to="/jobs" className="btn btn-primary">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </Layout>
    );
  }

  if (!user || user.role === 'admin') {
    return null; // Prevent flash of content
  }

  return (
    <Layout
      title={`Apply for ${job.title} - Micro Freelance`}
      description={`Apply for the job: ${job.title}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-200 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-base-content mb-6">
                Apply for this Job
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Letter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center">
                      <FiFileText className="w-5 h-5 mr-2 text-primary" />
                      Cover Letter *
                    </span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Explain why you're the perfect fit for this job. Highlight your relevant skills, experience, and how you plan to approach this project..."
                    className="textarea textarea-bordered textarea-lg w-full h-40 resize-none"
                    maxLength={1500}
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      {formData.coverLetter.length}/1500 characters (minimum 100 characters)
                    </span>
                  </label>
                </div>

                {/* Delivery Time and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-semibold flex items-center">
                        <FiClock className="w-5 h-5 mr-2 text-warning" />
                        Your Delivery Time *
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

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-semibold flex items-center">
                        <FiDollarSign className="w-5 h-5 mr-2 text-success" />
                        Your Proposed Budget *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="e.g., $450"
                      className="input input-bordered input-lg w-full"
                    />
                  </div>
                </div>

                {/* Application Guidelines */}
                <div className="alert alert-info">
                  <div>
                    <h3 className="font-bold">Application Tips:</h3>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>Personalize your cover letter for this specific job</li>
                      <li>Highlight relevant portfolio pieces or experience</li>
                      <li>Be realistic with your timeline and budget</li>
                      <li>Ask clarifying questions if needed</li>
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
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Job Summary Sidebar */}
          <div className="space-y-6">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content mb-4">
                  Job Summary
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">
                      {job.title}
                    </h4>
                    <p className="text-sm text-base-content/70 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  <div className="divider"></div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Budget:</span>
                      <span className="font-semibold text-success">{job.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Required Delivery:</span>
                      <span className="font-semibold">{job.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Category:</span>
                      <span className="font-semibold">{job.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Posted by:</span>
                      <span className="font-semibold">{job.postedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content mb-4">
                  Application Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Applications received:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Average proposal:</span>
                    <span className="font-medium">$380</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Competition level:</span>
                    <span className="badge badge-warning badge-sm">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyJob;