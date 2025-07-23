import React, { useState } from 'react';
import { FiTag, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import Swal from 'sweetalert2';

const AddCategory: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(categoriesData);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Category name is required');
    if (!formData.icon.trim()) errors.push('Category icon is required');
    if (!formData.description.trim()) errors.push('Category description is required');
    if (categories.some(cat => cat.name.toLowerCase() === formData.name.toLowerCase())) {
      errors.push('Category with this name already exists');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      Swal.fire({
        title: 'Validation Error',
        html: errors.map(error => `• ${error}`).join('<br>'),
        icon: 'error',
        confirmButtonColor: '#00B8C6'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        icon: formData.icon,
        description: formData.description
      };

      setCategories(prev => [...prev, newCategory]);
      setFormData({ name: '', icon: '', description: '' });

      Swal.fire({
        title: 'Success!',
        text: 'Category has been added successfully.',
        icon: 'success',
        confirmButtonColor: '#00B8C6',
        timer: 2000,
        showConfirmButton: false
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDeleteCategory = (categoryId: number, categoryName: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the "${categoryName}" category? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
        Swal.fire({
          title: 'Deleted!',
          text: 'Category has been deleted successfully.',
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
      title="Manage Categories - Admin - Micro Freelance"
      description="Add and manage job categories from the admin dashboard."
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Manage Categories
          </h1>
          <p className="text-base-content/70">
            Add new job categories and manage existing ones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Category Form */}
          <div className="bg-base-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center">
              <FiPlus className="w-6 h-6 mr-2 text-primary" />
              Add New Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold flex items-center">
                    <FiTag className="w-4 h-4 mr-2 text-primary" />
                    Category Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development"
                  className="input input-bordered input-lg w-full"
                  maxLength={50}
                />
              </div>

              {/* Category Icon */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Category Icon (Emoji) *
                  </span>
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="e.g., 🌐"
                  className="input input-bordered input-lg w-full"
                  maxLength={5}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Use a single emoji to represent this category
                  </span>
                </label>
              </div>

              {/* Category Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of this category..."
                  className="textarea textarea-bordered textarea-lg w-full h-24 resize-none"
                  maxLength={200}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    {formData.description.length}/200 characters
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary btn-lg w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Category...' : 'Add Category'}
              </button>
            </form>
          </div>

          {/* Existing Categories */}
          <div className="bg-base-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Existing Categories ({categories.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <h3 className="font-semibold text-base-content">
                            {category.name}
                          </h3>
                          <p className="text-sm text-base-content/70">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Feature Coming Soon',
                              text: 'Category editing functionality will be available soon!',
                              icon: 'info',
                              confirmButtonColor: '#00B8C6'
                            });
                          }}
                          className="btn btn-outline btn-sm"
                          title="Edit Category"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          className="btn btn-outline btn-error btn-sm"
                          title="Delete Category"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-8">
                <FiTag className="w-16 h-16 text-base-content/40 mx-auto mb-4" />
                <p className="text-base-content/70">No categories added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;