// src/pages/Register.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';

import Lottie from 'lottie-react';
import loginAnimation from '../lottie/register.json';

// Change this if your backend path is different
const REGISTER_URL = 'http://localhost:8080/register';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If you have any auth state that auto-redirects when logged in, keep/use it here.
  useEffect(() => {
    // e.g., if you store a token on localStorage and want to prevent re-register while "logged in"
    // const token = localStorage.getItem('token');
    // if (token) navigate('/');
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      // Expecting JSON from your backend, e.g. { success: true, token?: string, user?: {...}, message?: string }
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || 'Registration failed.');
      }

      // If your backend returns a JWT token on signup, you can store it:
      // if (data?.token) localStorage.setItem('token', data.token);

      await Swal.fire({
        title: 'Registration Successful!',
        text: 'You can now log in with your credentials.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 1800,
        showConfirmButton: false,
      });

      // Go to login so user can authenticate manually and receive JWT from your /login endpoint
      navigate('/login');
    } catch (err: any) {
      Swal.fire({
        title: 'Registration Failed',
        text: err?.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Register - Micro Freelance" description="Create your Micro Freelance account.">
      <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 grid place-items-center">
        <div className="max-w-5xl w-full rounded-3xl bg-base-200 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-base-300">
          {/* Lottie Animation */}
          <div className="max-w-md mx-auto">
            <Lottie animationData={loginAnimation} loop />
          </div>

          {/* Register Form */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">Create Account</h2>
              <p className="text-base-content/70">Join Micro Freelance and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 rounded-2xl p-8 border border-base-300">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiUser className="w-4 h-4 mr-2 text-primary" /> Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="input input-bordered input-lg w-full"
                  required
                />
              </div>

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
                    placeholder="Create a password"
                    className="input input-bordered input-lg w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FiLock className="w-4 h-4 mr-2 text-primary" /> Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter password"
                  className="input input-bordered input-lg w-full"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;