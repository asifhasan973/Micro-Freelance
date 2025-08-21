import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

import Lottie from 'lottie-react';
import loginAnimation from '../lottie/Login.json'; // adjust path

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/');
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

    setTimeout(() => {
      const success = login(formData.email, formData.password);

      if (success) {
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back to Micro Freelance.',
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.',
          icon: 'error',
          confirmButtonColor: '#00B8C6'
        });
      }

      setIsSubmitting(false);
    }, 1000);
  };

  const fillDemoCredentials = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@gmail.com',
        password: 'admin'
      });
    } else {
      setFormData({
        email: 'test@gmail.com',
        password: 'test'
      });
    }
  };

  if (user) return null;

  return (
    <Layout
      title="Login - Micro Freelance"
      description="Login to your Micro Freelance account to access all features."
    >
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 grid place-items-center ">
        <div className="max-w-5xl w-full bg-gray-100 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Lottie Animation Container */}
          <div className="max-w-md mx-auto">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>

          {/* Login Form Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h2>
              <p className="text-base-content/70">Sign in to your Micro Freelance account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-base-200 rounded-2xl p-8">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiMail className="w-4 h-4 mr-2 text-primary" />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    className="input input-bordered input-lg w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-base-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-base-content mb-3">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('admin')}
                    className="btn btn-outline btn-sm"
                  >
                    Admin Login
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('user')}
                    className="btn btn-outline btn-sm"
                  >
                    User Login
                  </button>
                </div>
                <div className="mt-2 text-xs text-base-content/60">
                  <p>Or use any email with 4+ char password for job seeker access</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
