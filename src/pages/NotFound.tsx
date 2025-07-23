import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import Layout from '../components/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout
      title="404 - Page Not Found - Micro Freelance"
      description="The page you're looking for doesn't exist."
    >
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-bounce-gentle"></div>
              <img
                src="https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?w=400"
                alt="404 Illustration"
                className="relative rounded-2xl shadow-2xl w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-3xl font-bold text-base-content mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-base-content/70 leading-relaxed">
                Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
                Don't worry, even the best explorers sometimes take a wrong turn.
              </p>
            </div>

            <div className="bg-base-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-base-content mb-4">
                What can you do?
              </h3>
              <ul className="text-left space-y-2 text-base-content/70">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Check the URL for any typos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Go back to the previous page
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Browse our available jobs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Start fresh from the homepage
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-lg"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
              <Link to="/" className="btn btn-primary btn-lg">
                <FiHome className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              <Link to="/jobs" className="btn btn-secondary btn-lg">
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="mt-12 text-base-content/50">
            <p className="text-sm">
              If you believe this is an error, please{' '}
              <Link to="/contact" className="text-primary hover:underline">
                contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;