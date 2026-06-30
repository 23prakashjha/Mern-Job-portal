import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaUsers, FaBriefcase, FaSignOutAlt, FaUserShield } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0 });

  useEffect(() => {
    let storedUser = null;
    try { storedUser = JSON.parse(localStorage.getItem("user")); } catch {}
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUserShield size={24} className="text-cyan-300" />
          <span className="text-xl font-black">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold hover:bg-rose-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <FaUsers size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">Total Users</p>
                <p className="text-3xl font-black">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <FaBriefcase size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">Total Jobs</p>
                <p className="text-3xl font-black">{stats.totalJobs}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;