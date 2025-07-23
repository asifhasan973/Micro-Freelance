import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonColor: '#00B8C6'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const success = login(formData.email, formData.password);
      
      if (success && formData.email === 'admin@gmail.com') {
        Swal.fire({
          title: 'Admin Login Successful!',
          text: 'Welcome to the admin dashboard.',
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/admin');
        });
      } else {
        Swal.fire({
          title: 'Access Denied',
          text: 'Invalid admin credentials. Please try again.',
          icon: 'error',
          confirmButtonColor: '#00B8C6'
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  if (user) {
    return null; // Prevent flash of content
  }

  return (
    <Layout
      title="Admin Login - Micro Freelance"
      description="Admin access to Micro Freelance management dashboard."
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FiShield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mb-2">
              Admin Access
            </h2>
            <p className="text-base-content/70">
              Sign in to access the admin dashboard
            </p>
          </div>

          <div className="bg-base-200 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiMail className="w-4 h-4 mr-2 text-primary" />
                    Admin Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter admin email"
                  className="input input-bordered input-lg w-full"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiLock className="w-4 h-4 mr-2 text-primary" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter admin password"
                    className="input input-bordered input-lg w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-base-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-base-content mb-2">Demo Admin Credentials:</p>
                <div className="text-sm text-base-content/70">
                  <p>Email: admin@gmail.com</p>
                  <p>Password: admin</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ email: 'admin@gmail.com', password: 'admin' })}
                  className="btn btn-outline btn-sm mt-2"
                >
                  Fill Demo Credentials
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In as Admin'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                Not an admin?{' '}
                <a href="/login" className="text-primary hover:underline font-medium">
                  Regular Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;