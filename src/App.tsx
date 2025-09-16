import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import AllJobs from './pages/AllJobs';
import JobDetails from './pages/JobDetails';
import AddJob from './pages/AddJob';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import './pages/UserProfile.css';

// Lazy load additional pages
const MyJobs = React.lazy(() => import('./pages/MyJobs'));
const ApplyJob = React.lazy(() => import('./pages/ApplyJob'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AllUsers = React.lazy(() => import('./pages/AllUsers'));
const AddCategory = React.lazy(() => import('./pages/AddCategory'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            {/* render Navbar once */}
            <Navbar />

            <div className="min-h-screen bg-base-100">
              <React.Suspense
                fallback={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg text-primary" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<AllJobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/add-job" element={<AddJob />} />
                  <Route path="/my-jobs" element={<MyJobs />} />
                  <Route path="/apply/:id" element={<ApplyJob />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AllUsers />} />
                  <Route path="/admin/categories" element={<AddCategory />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;