import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiSearch, FiDownload, FiUser } from "react-icons/fi";
import api from "../services/api";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState({ id: null, type: null, loading: false });

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
      return;
    }
    fetchApplicants();
  }, [jobId]);

  // Fetch applicants from API
  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/applications/job/${jobId}/applicants`);
      setApplicants(res.data);
      setFiltered(res.data);
    } catch (error) {
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  // Search applicants by name or email
  const handleSearch = (value) => {
    setSearch(value);
    const filteredData = applicants.filter(
      (app) =>
        app.name.toLowerCase().includes(value.toLowerCase()) ||
        app.email.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredData);
  };

  // Shortlist or Reject applicant
  const handleAction = async () => {
    if (!action.id || !action.type) return;

    setAction((prev) => ({ ...prev, loading: true }));

    try {
      await api.put(`/applications/${action.type}/${action.id}`);
      toast.success(`Applicant ${action.type}ed successfully`);
      setAction({ id: null, type: null, loading: false });
      fetchApplicants();
    } catch (error) {
      toast.error("Action failed");
      setAction((prev) => ({ ...prev, loading: false }));
    }
  };

  // Status badge styles
  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-100 text-gray-700";
    const s = status.trim().toLowerCase();
    if (s === "shortlisted") return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading Applicants...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Applicants</h2>
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-12">
            No applicants found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((app) => {
              const status = app.status?.trim().toLowerCase() || "pending";
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-100 p-3 rounded-full flex items-center justify-center">
                        <FiUser className="text-indigo-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.email}</p>
                      </div>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        status
                      )}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>

                    {app.resume && (
                      <a
                        href={app.resume.startsWith("http") ? app.resume : `/api${app.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 mt-4 text-indigo-600 font-medium hover:underline"
                      >
                        <FiDownload /> Download Resume
                      </a>
                    )}
                  </div>

                  {/* Buttons only for pending */}
                  {status === "pending" && (
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => setAction({ id: app.id, type: "shortlist", loading: false })}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => setAction({ id: app.id, type: "reject", loading: false })}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {action.id && action.type && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 animate-fadeIn">
              <h3 className="text-lg font-semibold mb-4">
                Confirm {action.type}?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setAction({ id: null, type: null, loading: false })}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  disabled={action.loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                  disabled={action.loading}
                >
                  {action.loading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Applicants;
