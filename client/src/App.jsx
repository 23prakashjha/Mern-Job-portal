import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeATS from "./pages/ResumeATS";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import UserAuth from "./pages/UserAuth";
import RecruiterAuth from "./pages/RecruiterAuth";

import Dashboard from "./recruiter/Dashboard";
import CompanyProfile from "./recruiter/CompanyProfile";
import AddJob from "./recruiter/AddJob";
import ManageJobs from "./recruiter/ManageJobs";
import Applicants from "./recruiter/Applicants";
import Shortlisted from "./recruiter/Shortlisted";

import AdminDashboard from "./admin/Dashboard";

const App = () => {
  const location = useLocation();

  // 🔥 Hide Navbar & Footer on recruiter/admin panel
  const hideLayout = location.pathname.startsWith("/recruiter") || location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-ats" element={<ResumeATS />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/recruiter-auth" element={<RecruiterAuth />} />

        {/* User Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Protected */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/company-profile"
          element={
            <ProtectedRoute role="recruiter">
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/add-job"
          element={
            <ProtectedRoute role="recruiter">
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/manage-jobs"
          element={
            <ProtectedRoute role="recruiter">
              <ManageJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants"
          element={
            <ProtectedRoute role="recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/shortlisted"
          element={
            <ProtectedRoute role="recruiter">
              <Shortlisted />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
