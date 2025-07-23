import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClock, FiDollarSign, FiUser, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const job = jobsData.find(j => j.id === parseInt(id || '0'));
  const relatedJobs = jobsData
    .filter(j => j.category === job?.category && j.id !== job?.id)
    .slice(0, 3);

  if (!job) {
    return (
      <Layout title="Job Not Found - Micro Freelance">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-base-content mb-4">Job Not Found</h1>
          <p className="text-base-content/70 mb-8">The job you're looking for doesn't exist.</p>
          <Link to="/jobs" className="btn btn-primary">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </Layout>
    );
  }

  const handleApplyClick = () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to login to apply for jobs.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00B8C6',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (user.role === 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'Admins cannot apply for jobs.',
        icon: 'warning',
        confirmButtonColor: '#00B8C6'
      });
      return;
    }

    navigate(`/apply/${job.id}`);
  };

  return (
    <Layout
      title={`${job.title} - Micro Freelance`}
      description={job.description.substring(0, 160)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-base-200 rounded-2xl p-8 mb-8">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-base-content">
                    {job.title}
                  </h1>
                  <div className="badge badge-primary badge-lg">
                    {job.category}
                  </div>
                </div>

                {/* Job Meta */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <FiDollarSign className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-sm text-base-content/60">Budget</p>
                      <p className="font-semibold text-success">{job.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiClock className="w-5 h-5 text-warning" />
                    <div>
                      <p className="text-sm text-base-content/60">Delivery</p>
                      <p className="font-semibold text-base-content">{job.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiUser className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/60">Posted by</p>
                      <p className="font-semibold text-base-content">{job.postedBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-base-content/60">Posted</p>
                      <p className="font-semibold text-base-content">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-xl font-semibold text-base-content mb-4">
                  Job Description
                </h2>
                <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content mb-4">
                  Ready to Apply?
                </h3>
                <div className="space-y-4">
                  <div className="stats stats-vertical shadow">
                    <div className="stat">
                      <div className="stat-title">Budget</div>
                      <div className="stat-value text-success text-2xl">{job.budget}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Delivery Time</div>
                      <div className="stat-value text-warning text-2xl">{job.deliveryTime}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleApplyClick}
                    className="btn btn-primary w-full btn-lg"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Employer Info */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content mb-4">
                  About the Employer
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full bg-primary/20">
                      <div className="flex items-center justify-center h-full">
                        <FiUser className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">{job.postedBy}</p>
                    <p className="text-sm text-base-content/60">Job Provider</p>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Member since</span>
                    <span className="font-medium">2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Jobs posted</span>
                    <span className="font-medium">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">4.8</span>
                      <div className="rating rating-sm">
                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-base-content mb-8">
              Related Jobs in {job.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedJobs.map((relatedJob) => (
                <JobCard key={relatedJob.id} job={relatedJob} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobDetails;