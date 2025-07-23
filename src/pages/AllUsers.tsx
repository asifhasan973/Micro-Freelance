import React, { useState } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json';
import Swal from 'sweetalert2';

const AllUsers: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: number, userName: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete user "${userName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete user!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleToggleStatus = (userId: number, userName: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    const action = newStatus === 'blocked' ? 'block' : 'unblock';
    
    Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
      text: `Do you want to ${action} "${userName}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'blocked' ? '#EF4444' : '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${action}!`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === userId ? { ...u, status: newStatus } : u
          )
        );
        Swal.fire({
          title: `User ${action}ed!`,
          text: `"${userName}" has been ${action}ed successfully.`,
          icon: 'success',
          confirmButtonColor: '#00B8C6',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  if (!user || user.role !== 'admin') {
    return null; // Prevent flash of content
  }

  return (
    <Layout
      title="All Users - Admin - Micro Freelance"
      description="Manage all platform users from the admin dashboard."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            All Users
          </h1>
          <p className="text-base-content/70">
            Manage and monitor all platform users
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-base-200 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                className="select select-bordered w-full"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="Job Provider">Job Providers</option>
                <option value="Job Seeker">Job Seekers</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-base-content/70">
              {filteredUsers.length} users found
            </span>
            {(searchTerm || roleFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('');
                }}
                className="btn btn-ghost btn-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-base-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-300">
                <tr>
                  <th className="text-base-content">User</th>
                  <th className="text-base-content">Email</th>
                  <th className="text-base-content">Role</th>
                  <th className="text-base-content">Join Date</th>
                  <th className="text-base-content">Status</th>
                  <th className="text-base-content">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-base-100">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img src={user.avatar} alt={user.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-base-content">{user.email}</td>
                    <td>
                      <div className="badge badge-outline">
                        {user.role}
                      </div>
                    </td>
                    <td className="text-base-content">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td>
                      <div className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {user.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.name, user.status)}
                          className={`btn btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                          title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                        >
                          {user.status === 'active' ? (
                            <FiUserX className="w-4 h-4" />
                          ) : (
                            <FiUserCheck className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Feature Coming Soon',
                              text: 'User editing functionality will be available soon!',
                              icon: 'info',
                              confirmButtonColor: '#00B8C6'
                            });
                          }}
                          className="btn btn-outline btn-sm"
                          title="Edit User"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="btn btn-outline btn-error btn-sm"
                          title="Delete User"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
              <FiSearch className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-4">
              No users found
            </h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('');
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllUsers;