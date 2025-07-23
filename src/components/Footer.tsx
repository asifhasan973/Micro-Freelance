import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiBriefcase } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FiBriefcase className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-base-content">Micro Freelance</span>
            </div>
            <p className="text-base-content/70 text-sm">
              Connect talented professionals with exciting opportunities. 
              Build your career or find the perfect team member.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/add-job" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Content Writing
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-base-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base-content/60 text-sm">
            © 2025 Micro Freelance, CUET, Bangladesh. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-base-content/60 hover:text-primary transition-colors text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-base-content/60 hover:text-primary transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/cookies" className="text-base-content/60 hover:text-primary transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;