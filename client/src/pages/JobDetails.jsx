import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCheckCircle,
  FaCalendarAlt,
  FaLaptopHouse,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaBuilding,
  FaTimes,
  FaUserTie,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [status, setStatus] = useState(null);
  const [saved, setSaved] = useState(false);

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  // FETCH JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);

        if (user) {
          const { data: applied } = await api.get(`/applications/check/${id}`);
          setAlreadyApplied(applied?.applied);

          if (applied?.applied) {
            const { data: statusRes } = await api.get(`/applications/status/${id}`);
            setStatus(statusRes?.status);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // APPLY
  const handleApply = async (e) => {
    e.preventDefault();

    if (!user) return navigate("/login");
    if (!resume) return alert("Please upload resume");

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      formData.append("jobId", id);

      await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlreadyApplied(true);
      setStatus("pending");
      setShowApply(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Job not found</h2>
          <p className="text-gray-500">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex-grow">
                <h1 className="text-4xl font-bold gradient-text mb-4">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  {job.company && (
                    <span className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                      <FaBuilding className="text-blue-600" /> 
                      <span className="font-medium">{job.company}</span>
                    </span>
                  )}

                  {job.remote && (
                    <span className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                      <FaLaptopHouse className="text-green-600" /> 
                      <span className="font-medium">Remote</span>
                    </span>
                  )}

                  {job.location && !job.remote && (
                    <span className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl">
                      <FaMapMarkerAlt className="text-red-600" /> 
                      <span className="font-medium">{job.location}</span>
                    </span>
                  )}

                  <span className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl">
                    <FaBriefcase className="text-purple-600" /> 
                    <span className="font-medium">{job.experience_level}</span>
                  </span>

                  <span className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                    <FaMoneyBillWave className="text-green-600" />
                    <span className="font-bold text-green-700">
                      ₹{Number(job.salary_min).toLocaleString()} - ₹{Number(job.salary_max).toLocaleString()}
                    </span>
                  </span>

                  {job.deadline && (
                    <span className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl">
                      <FaCalendarAlt className="text-orange-600" />
                      <span className="font-medium">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSaved(!saved)}
                  className="text-red-500 text-2xl p-2 hover:bg-red-50 rounded-xl transition-all"
                >
                  {saved ? <FaHeart /> : <FaRegHeart />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigator.share?.({ url: window.location.href })}
                  className="text-indigo-600 text-2xl p-2 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  <FaShareAlt />
                </motion.button>
              </div>
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserTie className="text-indigo-600" />
                  Job Description
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl">
                  {job.description}
                </div>
              </div>

              {alreadyApplied && (
                <motion.div 
                  className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <FaCheckCircle className="text-green-600 text-2xl" />
                  <div>
                    <p className="font-bold text-green-800">Application Submitted</p>
                    <p className="text-green-700">Status: <span className="font-semibold capitalize">{status}</span></p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* RESPONSIBILITIES */}
          {job.responsibilities && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Section title="Key Responsibilities" icon={<FaBriefcase className="text-blue-600" />}>
                {job.responsibilities.split("\n").map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </Section>
            </motion.div>
          )}

          {/* QUALIFICATIONS */}
          {job.qualifications && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Section title="Qualifications & Requirements" icon={<FaGraduationCap className="text-purple-600" />}>
                {job.qualifications.split("\n").map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </Section>
            </motion.div>
          )}

          {/* SKILLS */}
          {job.skills && (
            <motion.div
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaClock className="text-indigo-600" />
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.split(",").map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-200 hover:shadow-md transition-all"
                  >
                    {skill.trim()}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* APPLY CARD */}
        <motion.div
          className="sticky top-24 h-fit"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold gradient-text mb-6">Ready to Apply?</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <FaClock className="text-indigo-600" />
                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center gap-3 text-orange-600">
                  <FaCalendarAlt />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {alreadyApplied ? (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaCheckCircle /> Already Applied
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApply(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Apply Now →
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* APPLY MODAL */}
      {showApply && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowApply(false)}
        >
          <motion.div 
            className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold gradient-text">Apply Position</h3>
              <button
                onClick={() => setShowApply(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell us why you're perfect for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-500 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const Section = ({ title, children, icon }) => (
  <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      {icon}
      {title}
    </h3>
    <ul className="space-y-3 text-gray-700">
      {children}
    </ul>
  </div>
);

export default JobDetails;
