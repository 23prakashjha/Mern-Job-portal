import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiTrash2, FiUsers, FiSearch } from "react-icons/fi";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      console.log("Jobs fetched:", res.data); // Debug
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete a job
  const deleteJob = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/jobs/${deleteId}`);
      toast.success("Job deleted successfully");
      setDeleteId(null);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // Filter jobs by search term
  const handleSearch = (value) => {
    setSearch(value);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Manage Jobs</h2>
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>
        </div>

        {/* Job Count */}
        <div className="mb-6 text-gray-700 font-medium">
          Total Jobs: {filteredJobs.length}
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center text-indigo-600 font-semibold animate-pulse">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-lg text-gray-700 text-center p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-semibold">No Jobs Found</h3>
            <p className="mt-2 text-gray-600">Start by posting a new job.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => {
              const jobId = job.id; // backend uses `id`, not _id

              // Format salary in Indian Rupees
              const salaryDisplay =
                job.salary_min && job.salary_max
                  ? `₹${job.salary_min.toLocaleString("en-IN")} - ₹${job.salary_max.toLocaleString("en-IN")}`
                  : "Not Specified";

              return (
                <div
                  key={jobId}
                  className="bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 transition transform hover:scale-105 hover:shadow-indigo-500/30"
                >
                  <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 mt-2">📍 {job.location || "Not Specified"}</p>
                  <p className="text-green-500 font-semibold mt-2">💰 {salaryDisplay}</p>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() => setDeleteId(jobId)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      <FiTrash2 /> Delete
                    </button>

                    <a
                      href={`/recruiter/applicants/${jobId}`}
                      className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition"
                    >
                      <FiUsers /> Applicants
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-2xl animate-fadeIn text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this job?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteJob}
                className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
