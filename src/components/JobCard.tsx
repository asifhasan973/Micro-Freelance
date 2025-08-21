import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock,   FiUser } from 'react-icons/fi';

interface Job {
  id: number;
  title: string;
  budget: string;
  deliveryTime: string;
  category: string;
  description: string;
  postedBy: string;
  postedDate: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <h2 className="card-title text-base-content line-clamp-2 pe-5">
            {job.title}
          </h2>
          <div className="border px-1 rounded badge-primary badge-outline">
            {job.category}
          </div>
        </div>

        <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-1">
            {/* <FiDollarSign className="w-4 h-4 text-success" /> */}
            <span className="text-xl text-success">৳</span>

            <span className="text-xl font-semibold text-success">
              {job.budget}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FiClock className="w-4 h-4 text-warning" />
            <span className="text-sm text-base-content/70">
              {job.deliveryTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiUser className="w-4 h-4 text-base-content/60" />
            <span className="text-sm text-base-content/60">
              {job.postedBy}
            </span>
          </div>
          <span className="text-xs text-base-content/50">
            {new Date(job.postedDate).toLocaleDateString()}
          </span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/jobs/${job.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;