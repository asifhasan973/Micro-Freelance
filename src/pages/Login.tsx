// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';

import Lottie from 'lottie-react';
import loginAnimation from '../lottie/Login.json';

// Change if your backend path is different
const LOGIN_URL = 'http://localhost:8080/login';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Invalid email or password.');

      if (!data?.token || !data?.user) {
        throw new Error('Unexpected server response.');
      }

      // Save auth
      localStorage.setItem('token', data.token);
      localStorage.setItem('current_user', JSON.stringify(data.user));

      // Optional: let other parts of the app know
      window.dispatchEvent(new Event('auth-updated'));

      await Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back to Micro Freelance.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 1600,
        showConfirmButton: false,
      });

      // Redirect
      const target = location?.state?.from || '/';
      navigate(target);
    } catch (err: any) {
      Swal.fire({
        title: 'Login Failed',
        text: err?.message || 'Please try again.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Login - Micro Freelance"
      description="Login to your Micro Freelance account to access all features."
    >
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 grid place-items-center ">
        <div className="max-w-5xl w-full bg-gray-100 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Animation */}
          <div className="max-w-md mx-auto">
            <Lottie animationData={loginAnimation} loop />
          </div>

          {/* Form */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h2>
              <p className="text-base-content/70">Sign in to your Micro Freelance account</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-base-200 rounded-2xl p-8"
            >
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiMail className="w-4 h-4 mr-2 text-primary" /> Email
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
                    <FiLock className="w-4 h-4 mr-2 text-primary" /> Password
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

              {/* Submit */}
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