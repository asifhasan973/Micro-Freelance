// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiBriefcase } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const Avatar: React.FC<{ name: string; src?: string }> = ({ name, src }) => {
  const initials = name?.[0]?.toUpperCase() || 'U';
  return src ? (
    <img src={src} alt={name} className="w-8 h-8 rounded-full object-cover border border-base-300" />
  ) : (
    <div className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center text-sm font-semibold">
      {initials}
    </div>
  );
};

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00B8C6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, logout',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        navigate('/');
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1600,
          showConfirmButton: false,
        });
      }
    });
  };

  // Everyone sees everything. Mark routes that should prompt login if user is not authenticated.
  const navLinks = [
    { to: '/', label: 'Home', requiresAuth: false },
    { to: '/jobs', label: 'All Jobs', requiresAuth: false },
    { to: '/add-job', label: 'Post Job', requiresAuth: true },
    { to: '/my-jobs', label: 'My Jobs', requiresAuth: true },
    { to: '/user-profile', label: 'View Profile', requiresAuth: true },
  ];

  const isActive = (path: string) =>
    location.pathname === path ? 'text-primary font-semibold' : 'text-base-content';

  // Centralized click handler that shows Swal if auth is required
  const handleNavClick = (to: string, requiresAuth: boolean) => (e: React.MouseEvent) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      Swal.fire({
        title: 'Login required',
        text: 'Please log in to access this page.',
        icon: 'info',
        confirmButtonText: 'Go to Login',
        showCancelButton: true,
        confirmButtonColor: '#00B8C6',
      }).then((res) => {
        if (res.isConfirmed) {
          navigate('/login', { state: { from: to } });
        }
      });
      return;
    }
    // close mobile menu after navigating
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <FiBriefcase className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl md:text-3xl pt-2 font-bold text-base-content">Micro Freelance</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavClick(link.to, link.requiresAuth)}
                className={`hover:text-primary transition-colors font-medium ${isActive(link.to)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Avatar name={user.name} src={user.avatarUrl} />
                <span className="text-sm max-w-[140px] truncate">Hi, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-base-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick(link.to, link.requiresAuth)}
                  className="hover:text-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="border-t border-base-300 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} src={user.avatarUrl} />
                    <span className="text-sm">Hi, {user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-base-300 pt-4 space-y-2">
                  <Link to="/login" className="btn btn-ghost btn-sm w-full" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm w-full" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;