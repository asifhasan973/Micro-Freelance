import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

import Lottie from 'lottie-react';
import loginAnimation from '../lottie/register.json';

// 👇 add this import
import { signInWithGoogle } from '../lib/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, user } = useAuth(); // keeps your existing email+password flow
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // 👈 new

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({ title: 'Validation Error', text: 'Please fill in all fields.', icon: 'error', confirmButtonColor: '#00B8C6' });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ title: 'Password Mismatch', text: 'Passwords do not match.', icon: 'error', confirmButtonColor: '#00B8C6' });
      return;
    }

    setIsSubmitting(true);

    // keep your context-driven registration flow
    setTimeout(() => {
      const success = register(name, email, password);
      if (success) {
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Welcome to Micro Freelance.',
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate('/'));
      } else {
        Swal.fire({ title: 'Registration Failed', text: 'Email may already be in use.', icon: 'error', confirmButtonColor: '#00B8C6' });
      }
      setIsSubmitting(false);
    }, 800);
  };

  // 👇 Google sign-in/up handler
  const handleGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle(); // creates the account if it doesn't exist
      Swal.fire({
        title: 'Signed in with Google',
        text: 'Welcome to Micro Freelance.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 1800,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: 'Google Sign-in Failed',
        text: err?.message || 'Please try again.',
        icon: 'error',
        confirmButtonColor: '#00B8C6',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (user) return null;

  return (
    <Layout title="Register - Micro Freelance" description="Create your Micro Freelance account.">
      <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 grid place-items-center">
        <div className="max-w-5xl w-full rounded-3xl bg-base-200 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-base-300">
          {/* Lottie Animation */}
          <div className="max-w-md mx-auto">
            <Lottie animationData={loginAnimation} loop={true} />
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

              {/* Divider */}
              <div className="divider text-sm text-base-content/70">or continue with</div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogle}
                className={`btn btn-outline btn-lg w-full gap-2 ${isGoogleLoading ? 'loading' : ''}`}
                disabled={isGoogleLoading}
              >
                {/* Google "G" SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path d="M44.5 20H24v8.5h11.8C34.8 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.2l6-6C34.7 5 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.5-4z"/>
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">Sign in here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;