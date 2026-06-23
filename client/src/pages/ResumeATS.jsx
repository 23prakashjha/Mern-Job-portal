import React, { useState } from "react";
import api from "../services/api";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFileAlt,
  FaBriefcase,
  FaSpinner
} from "react-icons/fa";

const ResumeATS = () => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkATS = async () => {
    if (!resume || !jobDesc) {
      alert("Please fill both fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/ats/check", {
        resume,
        jobDesc
      });

      setScore(data.score);
      setMatchedKeywords(data.matchedKeywords);
      setMissingKeywords(data.missingKeywords);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = () => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          ATS Resume Checker 🚀
        </h1>
        <p className="text-indigo-100 text-lg">
          Improve your resume & increase interview chances instantly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all">

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-700 flex items-center gap-2">
                <FaFileAlt /> Resume
              </h3>
              <textarea
                placeholder="Paste your resume..."
                value={resume}
                onChange={e => setResume(e.target.value)}
                rows={12}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-700 flex items-center gap-2">
                <FaBriefcase /> Job Description
              </h3>
              <textarea
                placeholder="Paste job description..."
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                rows={12}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none resize-none"
              />
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-8">
            <button
              onClick={checkATS}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FaSearch />
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {score && (
            <div className="mt-16 text-center">

              <h3 className="text-2xl font-bold mb-6 text-gray-700">
                Your ATS Score
              </h3>

              {/* Circular Progress */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="96"
                    cy="96"
                    r="85"
                    stroke="#e5e7eb"
                    strokeWidth="15"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="85"
                    stroke="url(#grad)"
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray={534}
                    strokeDashoffset={534 - (score / 100) * 534}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${getScoreColor()}`}>
                  {score}%
                </div>
              </div>

              {/* Keywords */}
              <div className="grid md:grid-cols-2 gap-10 text-left mt-12">

                <div>
                  <h4 className="font-bold text-green-600 mb-4 text-lg">
                    Matched Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((word, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle /> {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-red-600 mb-4 text-lg">
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((word, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaTimesCircle /> {word}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumeATS;
