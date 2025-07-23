import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import jobsData from '../data/jobs.json';
import Swal from 'sweetalert2';

const MyJobs: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(
    jobsData.filter(job => job.postedBy === 'test@gmail.com')
  );

  const handleDelete = (jobId: number, jobTitle: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${jobTitle}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your job has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  if (!user) {
    return (
      <Layout title="My Jobs - Micro Freelance">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-base-content mb-4">Login Required</h1>
          <p className="text-base-content/70 mb-8">You need to login to view your jobs.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="My Posted Jobs - Micro Freelance"
      description="Manage your posted jobs and track applications."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-base-content mb-2">
              My Posted Jobs
            </h1>
            <p className="text-base-content/70">
              Manage your job postings and track applications
            </p>
          </div>
          <Link to="/add-job" className="btn btn-primary btn-lg mt-4 sm:mt-0">
            <FiPlus className="w-5 h-5 mr-2" />
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-200 rounded-xl shadow-lg">
            <div className="stat-title">Total Jobs</div>
            <div className="stat-value text-primary">{jobs.length}</div>
            <div className="stat-desc">Posted by you</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow-lg">
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-success">{jobs.length}</div>
            <div className="stat-desc">Currently accepting applications</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow-lg">
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-warning">24</div>
            <div className="stat-desc">Across all jobs</div>
          </div>
        </div>

        {/* Jobs List */}
        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="card-title text-xl text-base-content">
                          {job.title}
                        </h2>
                        <div className="badge badge-success">Active</div>
                      </div>
                      
                      <p className="text-base-content/70 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-base-content/60">Budget:</span>
                          <div className="font-semibold text-success">{job.budget}</div>
                        </div>
                        <div>
                          <span className="text-base-content/60">Delivery:</span>
                          <div className="font-semibold">{job.deliveryTime}</div>
                        </div>
                        <div>
                          <span className="text-base-content/60">Category:</span>
                          <div className="font-semibold">{job.category}</div>
                        </div>
                        <div>
                          <span className="text-base-content/60">Posted:</span>
                          <div className="font-semibold">
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn btn-outline btn-sm"
                        title="View Job"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                      <button
                        className="btn btn-outline btn-sm"
                        title="Edit Job"
                        onClick={() => {
                          Swal.fire({
                            title: 'Feature Coming Soon',
                            text: 'Job editing functionality will be available soon!',
                            icon: 'info',
                            confirmButtonColor: '#00B8C6'
                          });
                        }}
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id, job.title)}
                        className="btn btn-outline btn-error btn-sm"
                        title="Delete Job"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Applications Summary */}
                  <div className="border-t border-base-300 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-base-content/60">
                          <strong>3</strong> applications received
                        </span>
                        <span className="text-base-content/60">
                          <strong>1</strong> in review
                        </span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          Swal.fire({
                            title: 'Applications',
                            text: 'Application management will be available soon!',
                            icon: 'info',
                            confirmButtonColor: '#00B8C6'
                          });
                        }}
                      >
                        View Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
              <FiPlus className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-4">
              No jobs posted yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Start by posting your first job to find talented freelancers
            </p>
            <Link to="/add-job" className="btn btn-primary btn-lg">
              <FiPlus className="w-5 h-5 mr-2" />
              Post Your First Job
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyJobs;