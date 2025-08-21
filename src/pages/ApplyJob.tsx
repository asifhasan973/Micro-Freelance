import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {  FiArrowLeft } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import jobsData from '../data/jobs.json';
import Swal from 'sweetalert2';

const ApplyJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    languages: '',
    experience: '',
    education: '',
    skills: '',
    certifications: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resume: '',
    coverLetter: '',
    deliveryTime: '',
    budget: ''
  });

  const job = jobsData.find(j => j.id === parseInt(id || '0'));

  React.useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to login to apply for jobs.',
        icon: 'info',
        confirmButtonColor: '#00B8C6'
      }).then(() => navigate('/login'));
      return;
    }

    if (user.role === 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'Admins cannot apply for jobs.',
        icon: 'warning',
        confirmButtonColor: '#00B8C6'
      }).then(() => navigate('/'));
      return;
    }
  }, [user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.country.trim()) errors.push('Country is required');
    if (!formData.resume) errors.push('Resume upload is required');
    if (!formData.deliveryTime) errors.push('Delivery time is required');
    if (!formData.budget.trim()) errors.push('Proposed budget is required');

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

    // Simulate submission
    setTimeout(() => {
      Swal.fire({
        title: 'Application Submitted!',
        text: 'Your application has been sent to the job provider.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 3000,
        showConfirmButton: true
      }).then(() => navigate('/jobs'));

      setIsSubmitting(false);
    }, 1000);
  };

  if (!job) {
    return (
      <Layout title="Job Not Found - Micro Freelance">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
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

  if (!user || user.role === 'admin') return null;

  return (
    <Layout title={`Apply for ${job.title} - Micro Freelance`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-base-200 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6">Apply for this Job</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="fullName" placeholder="Full Name *" className="input input-bordered w-full" value={formData.fullName} onChange={handleInputChange} />
                <input name="email" placeholder="Email *" className="input input-bordered w-full" value={formData.email} onChange={handleInputChange} />
                <input name="phone" placeholder="Phone Number *" className="input input-bordered w-full" value={formData.phone} onChange={handleInputChange} />
                <input name="country" placeholder="Country *" className="input input-bordered w-full" value={formData.country} onChange={handleInputChange} />
              </div>

              {/* Extra Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="languages" placeholder="Languages (e.g., English, Bangla)" className="input input-bordered w-full" value={formData.languages} onChange={handleInputChange} />
                <input name="experience" placeholder="Experience (e.g., 2+ years in Web Dev)" className="input input-bordered w-full" value={formData.experience} onChange={handleInputChange} />
                <input name="education" placeholder="Education" className="input input-bordered w-full" value={formData.education} onChange={handleInputChange} />
                <input name="skills" placeholder="Skills (comma-separated)" className="input input-bordered w-full" value={formData.skills} onChange={handleInputChange} />
                <input name="certifications" placeholder="Certifications" className="input input-bordered w-full" value={formData.certifications} onChange={handleInputChange} />
                <input name="linkedin" placeholder="LinkedIn Profile" className="input input-bordered w-full" value={formData.linkedin} onChange={handleInputChange} />
                <input name="github" placeholder="GitHub Profile" className="input input-bordered w-full" value={formData.github} onChange={handleInputChange} />
                <input name="portfolio" placeholder="Portfolio Website" className="input input-bordered w-full" value={formData.portfolio} onChange={handleInputChange} />
              </div>

              {/* Resume Upload */}
              <div className="form-control">
                <label className="label"><span className="label-text">Upload Resume *</span></label>
                <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.files?.[0]?.name || '' }))} />
                {formData.resume && <span className="text-sm text-base-content/60 mt-1">Uploaded: {formData.resume}</span>}
              </div>

              {/* Cover Letter */}
              <div className="form-control">
                <label className="label"><span className="label-text">Upload Cover Letter</span></label>
                <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.files?.[0]?.name || '' }))} />
                {formData.coverLetter && <span className="text-sm text-base-content/60 mt-1">Uploaded: {formData.coverLetter}</span>}
              </div>


              {/* Delivery & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <input
                  name="deliveryTime"
                  placeholder="Delivery Time* (e.g., 5 days)"
                  className="input input-bordered w-full"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                />
                <input
                  name="budget"
                  placeholder="Proposed Budget * (e.g., ৳400)"
                  className="input input-bordered w-full"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>

          {/* Job Summary */}
          <div className="space-y-6">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{job.title}</h4>
                    <p className="text-sm text-base-content/70 line-clamp-3">{job.description}</p>
                  </div>
                  <div className="divider"></div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-base-content/60">Budget:</span><span className="font-semibold text-success">৳{job.budget}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Delivery:</span><span className="font-semibold">{job.deliveryTime}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Category:</span><span className="font-semibold">{job.category}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Posted by:</span><span className="font-semibold">{job.postedBy}</span></div>
                  </div>
                  <div className="card-actions justify-end mt-6">
                    <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-sm">View Full Details</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Application Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-base-content/60">Applications:</span><span className='font-bold'>5</span></div>
                  <div className="flex justify-between"><span className="text-base-content/60">Avg Proposal:</span><span className='font-bold'>৳380</span></div>
                  
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
