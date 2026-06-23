import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiDownload, FiUserCheck } from "react-icons/fi";
import api from "../services/api";

const Shortlisted = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
      return;
    }
    fetchShortlisted();
    // eslint-disable-next-line
  }, [jobId]);

  const fetchShortlisted = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/applications/job/${jobId}/applicants`);
      console.log("API Response:", res.data);

      // Filter candidates whose status includes "shortlist" (case-insensitive)
      const shortlisted = res.data.filter((app) => {
        const status = app.status || app.applicationStatus || "";
        return status.toLowerCase().includes("shortlist");
      });

      setCandidates(shortlisted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load shortlisted candidates");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.trim().toLowerCase()) {
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-indigo-600 animate-pulse">
        Loading Shortlisted Candidates...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Shortlisted Candidates
        </h2>

        {candidates.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No shortlisted candidates found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate) => {
              const id = candidate.id || candidate._id;
              const name =
                candidate.name ||
                candidate.fullName ||
                candidate.user?.name ||
                "Unknown";
              const email =
                candidate.email ||
                candidate.user?.email ||
                "No email provided";

              return (
                <div
                  key={id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 p-4 rounded-full flex items-center justify-center">
                        <FiUserCheck className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{name}</h3>
                        <p className="text-sm text-gray-500">{email}</p>
                      </div>
                    </div>

                    {candidate.cover_letter && (
                      <p className="text-gray-600 italic text-sm mb-4 line-clamp-3">
                        "{candidate.cover_letter}"
                      </p>
                    )}

                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        candidate.status
                      )}`}
                    >
                      {candidate.status
                        ? candidate.status.charAt(0).toUpperCase() +
                          candidate.status.slice(1)
                        : "Unknown"}
                    </span>

                    {candidate.resume && (
                      <a
                        href={
                          candidate.resume.startsWith("http")
                            ? candidate.resume
                            : `/api${candidate.resume}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition"
                      >
                        <FiDownload /> Download Resume
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlisted;
