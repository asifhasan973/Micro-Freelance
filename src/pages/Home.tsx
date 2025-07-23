import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiUsers, FiTrendingUp, FiStar, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

import Lottie from 'lottie-react';
import loginAnimation from '../lottie/Hiring.json'; 

const Home: React.FC = () => {
  const featuredJobs = jobsData.slice(0, 6);

  const stats = [
    { icon: FiBriefcase, label: 'Active Jobs', value: '10,000+' },
    { icon: FiUsers, label: 'Registered Users', value: '50,000+' },
    { icon: FiTrendingUp, label: 'Success Rate', value: '98%' },
    { icon: FiStar, label: 'Average Rating', value: '4.9/5' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
      text: 'Micro Freelance helped me find amazing freelance opportunities. The platform is user-friendly and the job quality is excellent.'
    },
    {
      name: 'Mike Chen',
      role: 'Startup Founder',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150',
      text: 'We found the perfect developer for our project through Micro Freelance. The process was smooth and efficient.'
    },
    {
      name: 'Anna Williams',
      role: 'Designer',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
      text: 'Great platform for connecting with clients. I\'ve built my entire freelance career through Micro Freelance.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content leading-tight">
                Find Your
                <span className="text-primary block">Dream Job</span>
                Today
              </h1>
              <p className="text-xl text-base-content/70 leading-relaxed">
                Connect with top employers and talented professionals. 
                Build your career or find the perfect team member in our thriving marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jobs" className="btn btn-primary btn-lg">
                  <FiSearch className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Link>
                <Link to="/add-job" className="btn btn-outline btn-lg">
                  <FiBriefcase className="w-5 h-5 mr-2" />
                  Post a Job
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-bounce-gentle"></div>
              {/* <img
                src="https://static.vecteezy.com/system/resources/thumbnails/030/470/139/small_2x/partnership-concept-closeup-of-two-businessmen-shaking-hands-over-black-background-ai-generated-photo.jpg"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              /> */}
               <div className="max-w-full mx-auto">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-base-content mb-2">
                  {stat.value}
                </h3>
                <p className="text-base-content/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-base-content/70">
              Discover exciting opportunities from top employers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              View All Jobs
              <FiArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-base-content/70">
              Join thousands of satisfied professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-body text-center">
                  <div className="avatar mb-4 flex justify-center items-center">
                    <div className="w-16 rounded-full">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                  </div>
                  <p className="text-base-content/70 italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <h3 className="font-semibold text-base-content">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join Micro Freelance today and take the next step in your career journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-neutral btn-lg">
              Sign Up Now
            </Link>
            <Link to="/jobs" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Explore Jobs
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;