import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api"; // ✅ IMPORT YOUR CUSTOM AXIOS

const Profile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // ✅ No full URL needed
      const { data: userData } = await api.get("/auth/profile");
      setUser(userData);

      const { data: appData } = await api.get("/applications/my");
      setApplications(appData);

    } catch (err) {
      console.error(err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      toast.success("Application withdrawn successfully");
      fetchProfileData();
    } catch (err) {
      toast.error("Failed to withdraw application");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "shortlisted")
      return (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <FaCheckCircle /> Shortlisted
        </span>
      );

    if (status === "rejected")
      return (
        <span className="flex items-center gap-1 text-red-600 font-medium">
          <FaTimesCircle /> Rejected
        </span>
      );

    return (
      <span className="flex items-center gap-1 text-yellow-600 font-medium">
        <FaClock /> Pending
      </span>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <FaUserCircle className="text-indigo-600 text-8xl" />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-600 mt-2">{user?.email}</p>

            <span className="inline-block mt-3 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {/* APPLIED JOBS */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaBriefcase /> Applied Jobs
          </h3>

          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              You haven't applied for any jobs yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition duration-300"
                >
                  <h4 className="text-lg font-semibold text-indigo-700">
                    {app.title}
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    {app.company}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {app.location}
                  </p>

                  <div className="mt-4">
                    {getStatusBadge(app.status)}
                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    Applied on:{" "}
                    {new Date(app.created_at).toLocaleDateString()}
                  </p>

                  {app.resume && (
                    <a
                      href={`http://localhost:5000${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 mt-4 text-indigo-600 hover:underline"
                    >
                      <FaDownload /> Download Resume
                    </a>
                  )}

                  {app.status === "pending" && (
                    <button
                      onClick={() => withdrawApplication(app.id)}
                      className="flex items-center gap-2 mt-4 text-red-600 hover:underline"
                    >
                      <FaTrash /> Withdraw Application
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
