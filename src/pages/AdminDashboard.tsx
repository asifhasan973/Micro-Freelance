import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiTag, FiBarChart3, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import jobsData from '../data/jobs.json';
import usersData from '../data/users.json';
import categoriesData from '../data/categories.json';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null; // Prevent flash of content
  }

  const stats = [
    {
      title: 'Total Jobs',
      value: jobsData.length,
      icon: FiBriefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Users',
      value: usersData.length,
      icon: FiUsers,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Categories',
      value: categoriesData.length,
      icon: FiTag,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Total Revenue',
      value: '$12,450',
      icon: FiDollarSign,
      color: 'text-info',
      bgColor: 'bg-info/10'
    }
  ];

  const recentJobs = jobsData.slice(0, 5);
  const recentUsers = usersData.slice(0, 5);

  return (
    <Layout
      title="Admin Dashboard - Micro Freelance"
      description="Admin dashboard for managing Micro Freelance platform."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Admin Dashboard
          </h1>
          <p className="text-base-content/70">
            Welcome back, {user.name}. Here's what's happening on your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base-content/60 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-base-content">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/users"
            className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body text-center">
              <FiUsers className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="card-title justify-center">Manage Users</h3>
              <p className="text-base-content/70">View and manage all platform users</p>
            </div>
          </Link>

          <Link
            to="/jobs"
            className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body text-center">
              <FiBriefcase className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="card-title justify-center">Manage Jobs</h3>
              <p className="text-base-content/70">View and moderate job postings</p>
            </div>
          </Link>

          <Link
            to="/admin/categories"
            className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body text-center">
              <FiTag className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="card-title justify-center">Manage Categories</h3>
              <p className="text-base-content/70">Add and edit job categories</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <h3 className="card-title">Recent Jobs</h3>
                <Link to="/jobs" className="btn btn-primary btn-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base-content line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-sm text-base-content/60">
                        {job.category} • {job.budget}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-base-content/60">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                      <div className="badge badge-success badge-sm">Active</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <h3 className="card-title">Recent Users</h3>
                <Link to="/admin/users" className="btn btn-primary btn-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={user.avatar} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-base-content">
                          {user.name}
                        </h4>
                        <p className="text-sm text-base-content/60">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="badge badge-outline badge-sm">
                        {user.role}
                      </div>
                      <p className="text-xs text-base-content/60 mt-1">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;