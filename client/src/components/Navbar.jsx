import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaBriefcase,
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaHome,
  FaRocket,
  FaSearch,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let storedUser = null;
    try { storedUser = JSON.parse(localStorage.getItem("user")); } catch {}
    setUser(storedUser || null);
    setDropdown(false);
    setMobileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/jobs", label: "Jobs", icon: FaBriefcase },
    { path: "/about", label: "About", icon: FaUser },
    { path: "/contact", label: "Contact", icon: FaEnvelope },
    { path: "/resume-builder", label: "Resume", icon: FaFileAlt },
    { path: "/resume-ats", label: "ATS Check", icon: FaSearch },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white/90 shadow-lg shadow-slate-950/5 backdrop-blur-xl"
            : "border-transparent bg-white/80 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg">
                <FaRocket />
              </span>
              <span className="truncate text-2xl font-black text-slate-950">
                Hire<span className="text-cyan-600">Nest</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                    isActive(item.path)
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <item.icon className={isActive(item.path) ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-600"} />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {!user ? (
                <>
                  <Link to="/login" className="rounded-full px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-100">
                    User login
                  </Link>
                  <Link to="/recruiter-auth" className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-900/10 transition hover:bg-cyan-300">
                    Recruiter login
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setDropdown((value) => !value)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800"
                    aria-label="Open account menu"
                  >
                    <FaUserCircle size={24} />
                  </button>

                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10"
                      >
                        {user.role === "recruiter" && (
                          <MenuLink to="/recruiter/dashboard" icon={FaTachometerAlt} label="Dashboard" />
                        )}
                        <MenuLink to="/profile" icon={FaUser} label="Profile" />
                        <MenuLink to="/settings" icon={FaCog} label="Settings" />
                        <button
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-bold text-rose-600 transition hover:bg-rose-50"
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenu((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold ${
                        isActive(item.path) ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <item.icon className={isActive(item.path) ? "text-cyan-300" : "text-slate-400"} />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
                  {!user ? (
                    <>
                      <Link to="/login" className="rounded-2xl border border-slate-200 px-4 py-3 text-center font-black text-slate-800">
                        User login
                      </Link>
                      <Link to="/recruiter-auth" className="rounded-2xl bg-cyan-400 px-4 py-3 text-center font-black text-slate-950">
                        Recruiter login
                      </Link>
                    </>
                  ) : (
                    <>
                      {user.role === "recruiter" && <MenuLink to="/recruiter/dashboard" icon={FaTachometerAlt} label="Dashboard" />}
                      <MenuLink to="/profile" icon={FaUser} label="Profile" />
                      <MenuLink to="/settings" icon={FaCog} label="Settings" />
                      <button onClick={handleLogout} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-rose-600">
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-20" />
    </>
  );
};

const MenuLink = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
    <Icon className="text-cyan-600" />
    {label}
  </Link>
);

export default Navbar;
