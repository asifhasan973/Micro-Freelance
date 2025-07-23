import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';
import categoriesData from '../data/categories.json';

const AllJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || job.category === selectedCategory;
      
      const matchesPrice = !priceRange || (() => {
        const budget = parseInt(job.budget.replace(/\D/g, ''));
        switch (priceRange) {
          case 'under-100': return budget < 100;
          case '100-300': return budget >= 100 && budget <= 300;
          case '300-500': return budget >= 300 && budget <= 500;
          case 'over-500': return budget > 500;
          default: return true;
        }
      })();
      
      const matchesDelivery = !deliveryTime || (() => {
        const days = parseInt(job.deliveryTime.replace(/\D/g, ''));
        switch (deliveryTime) {
          case '1-3': return days <= 3;
          case '4-7': return days >= 4 && days <= 7;
          case '8-14': return days >= 8 && days <= 14;
          case 'over-14': return days > 14;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesPrice && matchesDelivery;
    });
  }, [searchTerm, selectedCategory, priceRange, deliveryTime]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setDeliveryTime('');
  };

  return (
    <Layout
      title="All Jobs - Micro Freelance"
      description="Browse and search through thousands of job opportunities on Micro Freelance."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Find Your Perfect Job
          </h1>
          <p className="text-xl text-base-content/70">
            Browse through {jobsData.length} available opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-base-200 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <select
                className="select select-bordered w-full"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="under-100">Under $100</option>
                <option value="100-300">$100 - $300</option>
                <option value="300-500">$300 - $500</option>
                <option value="over-500">Over $500</option>
              </select>
            </div>

            {/* Delivery Time Filter */}
            <div>
              <select
                className="select select-bordered w-full"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              >
                <option value="">Any Timeline</option>
                <option value="1-3">1-3 days</option>
                <option value="4-7">4-7 days</option>
                <option value="8-14">8-14 days</option>
                <option value="over-14">Over 14 days</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-base-content/70">
                {filteredJobs.length} jobs found
              </span>
              {(searchTerm || selectedCategory || priceRange || deliveryTime) && (
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-base-content/60">
              <FiFilter className="w-4 h-4" />
              <span>Filters Active</span>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
              <FiSearch className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-4">
              No jobs found
            </h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
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

export default AllJobs;