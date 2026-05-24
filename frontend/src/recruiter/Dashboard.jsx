import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaPlusCircle,
  FaBriefcase,
  FaBuilding,
  FaSignOutAlt,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchStats = async () => {
      try {
        const { data } = await api.get("/recruiter/dashboard");
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/recruiter-auth");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-indigo-50">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-screen w-72 bg-gradient-to-b from-indigo-700 to-purple-600 text-white p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-10">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:scale-105 transition duration-300"
          >
            🚀 HireNest
          </Link>
          <FaTimes
            className="md:hidden cursor-pointer text-xl hover:text-red-400 transition"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <nav className="space-y-3">
          {[
            { to: "/recruiter/add-job", icon: <FaPlusCircle />, label: "Add Job" },
            { to: "/recruiter/manage-jobs", icon: <FaBriefcase />, label: "Manage Jobs" },
            { to: "/recruiter/company-profile", icon: <FaBuilding />, label: "Company Profile" },
            { to: "/recruiter/applicants", icon: <FaUsers />, label: "Applicants" },
            { to: "/recruiter/shortlisted", icon: <FaUsers />, label: "Shortlist Application" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-indigo-700 font-semibold shadow-lg"
                    : "hover:bg-white/20 hover:scale-105"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <FaBars
            className="md:hidden text-2xl cursor-pointer hover:text-indigo-600 transition"
            onClick={() => setSidebarOpen(true)}
          />

          <h1 className="text-xl md:text-2xl font-bold text-gray-700 flex items-center gap-2">
            <FaChartLine className="text-indigo-600" /> Recruiter Dashboard
          </h1>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition shadow-sm"
            >
              <FaUserCircle size={22} />
              <span className="hidden md:block font-medium">
                {user?.name || "Recruiter"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 text-gray-800 animate-fadeIn">
                <NavLink
                  to="/recruiter/company-profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                >
                  <FaBuilding /> Company Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Stats Section */}
        <main className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              <div className="h-44 bg-gray-200 rounded-2xl"></div>
              <div className="h-44 bg-gray-200 rounded-2xl"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              <StatCard
                title="Total Jobs Posted"
                value={stats.totalJobs}
                icon={<FaBriefcase />}
                color="indigo"
              />

              <StatCard
                title="Total Applicants"
                value={stats.totalApplicants}
                icon={<FaUsers />}
                color="green"
              />

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* Stat Card Component */
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 border-${color}-600`}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <div className={`text-3xl text-${color}-600`}>{icon}</div>
    </div>
    <p className={`text-4xl font-bold text-${color}-600`}>{value}</p>
  </div>
);

export default Dashboard;
