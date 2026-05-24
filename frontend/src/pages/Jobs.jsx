import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaFilter,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSearch,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";
import api from "../services/api";

const normalizeJobsResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.jobs)) return payload.jobs;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.jobs)) return payload.data.jobs;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const initialFilters = {
    search: "",
    category: "",
    location: "",
    experience: "",
    salary: "",
    remote: false,
    sort: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const categories = [
    "Software Development",
    "Web Development",
    "Data Science",
    "Cyber Security",
    "Digital Marketing",
    "Finance",
    "Healthcare",
    "Engineering",
    "Human Resources",
    "AI & ML",
    "Cloud Computing",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        const data = normalizeJobsResponse(res.data);
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let temp = [...jobs];

    if (filters.search.trim()) {
      temp = temp.filter((job) => job.title?.toLowerCase().includes(filters.search.toLowerCase()));
    }

    if (filters.category) {
      temp = temp.filter((job) => job.category === filters.category);
    }

    if (filters.location.trim()) {
      temp = temp.filter((job) => job.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.experience) {
      temp = temp.filter((job) => job.experience === filters.experience || job.experience_level === filters.experience);
    }

    if (filters.salary) {
      temp = temp.filter((job) => {
        const salary = job.salary || job.salary_max || job.salaryMax || 0;
        return Number(salary) >= Number(filters.salary);
      });
    }

    if (filters.remote) {
      temp = temp.filter((job) => job.remote === true || job.type === "remote");
    }

    if (filters.sort === "newest") {
      temp.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
    }

    if (filters.sort === "salary") {
      temp.sort((a, b) => {
        const salaryA = a.salary || a.salary_max || a.salaryMax || 0;
        const salaryB = b.salary || b.salary_max || b.salaryMax || 0;
        return Number(salaryB) - Number(salaryA);
      });
    }

    setFilteredJobs(temp);
    setCurrentPage(1);
  }, [filters, jobs]);

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const safeFilteredJobs = Array.isArray(filteredJobs) ? filteredJobs : [];
  const currentJobs = safeFilteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(safeFilteredJobs.length / jobsPerPage);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.25),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(244,63,94,.2),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
              <FaBriefcase />
              Curated opportunities
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Discover roles that match your next move.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Filter by role, category, experience, salary, and work mode. Built to stay easy on mobile and powerful on desktop.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <FaFilter className="text-cyan-600" />
              <span className="font-black">{safeFilteredJobs.length} jobs available</span>
            </div>
            <button
              onClick={() => setFiltersOpen((value) => !value)}
              className="inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white lg:hidden"
            >
              {filtersOpen ? <FaTimes /> : <FaSlidersH />}
              Filters
            </button>
          </div>

          <select
            value={filters.sort}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
          >
            <option value="">Sort by</option>
            <option value="newest">Newest first</option>
            <option value="salary">Highest salary</option>
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black">Filter jobs</h2>
                <FaSlidersH className="text-cyan-600" />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={filters.search}
                    placeholder="Search job title"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 font-medium outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    onChange={(event) => setFilters({ ...filters, search: event.target.value })}
                  />
                </div>

                <FilterSelect value={filters.category} onChange={(value) => setFilters({ ...filters, category: value })}>
                  <option value="">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </FilterSelect>

                <input
                  type="text"
                  value={filters.location}
                  placeholder="Location"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  onChange={(event) => setFilters({ ...filters, location: event.target.value })}
                />

                <FilterSelect value={filters.experience} onChange={(value) => setFilters({ ...filters, experience: value })}>
                  <option value="">Experience level</option>
                  <option>Fresher</option>
                  <option>1-3 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years</option>
                </FilterSelect>

                <input
                  type="number"
                  value={filters.salary}
                  placeholder="Minimum salary"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  onChange={(event) => setFilters({ ...filters, salary: event.target.value })}
                />

                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700">
                  Remote only
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    className="h-5 w-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                    onChange={(event) => setFilters({ ...filters, remote: event.target.checked })}
                  />
                </label>

                <button
                  onClick={resetFilters}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="flex min-h-[360px] items-center justify-center rounded-[1.5rem] border border-slate-200 bg-white">
                <div className="spinner" />
              </div>
            ) : currentJobs.length === 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
                  <FaSearch />
                </div>
                <h3 className="text-2xl font-black">No jobs found</h3>
                <p className="mt-2 text-slate-500">Try changing your search terms or filters.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {currentJobs.map((job, index) => (
                  <JobCard key={job._id || job.id || index} job={job} index={index} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-11 min-w-11 rounded-2xl px-4 font-black transition ${
                      currentPage === index + 1
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

const FilterSelect = ({ value, onChange, children }) => (
  <select
    value={value}
    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
    onChange={(event) => onChange(event.target.value)}
  >
    {children}
  </select>
);

const JobCard = ({ job, index }) => {
  const salaryText = (() => {
    if (job.salary) return `Rs ${Number(job.salary).toLocaleString()}`;
    if (job.salary_min && job.salary_max) return `Rs ${Number(job.salary_min).toLocaleString()} - Rs ${Number(job.salary_max).toLocaleString()}`;
    if (job.salaryMin && job.salaryMax) return `Rs ${Number(job.salaryMin).toLocaleString()} - Rs ${Number(job.salaryMax).toLocaleString()}`;
    return "Salary not disclosed";
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
          <FaBuilding />
        </div>
        {job.remote && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Remote</span>}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-black leading-snug text-slate-950 transition group-hover:text-cyan-700">{job.title || "Untitled role"}</h3>
        {job.category && <p className="mt-2 text-sm font-bold text-cyan-700">{job.category}</p>}
        <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{job.description || "No description available."}</p>

        <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
          <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-rose-500" /> {job.location || "Location not specified"}</p>
          <p className="flex items-center gap-3"><FaBriefcase className="text-cyan-600" /> {job.experience || job.experience_level || "Experience not specified"}</p>
          <p className="flex items-center gap-3 text-slate-950"><FaMoneyBillWave className="text-emerald-600" /> {salaryText}</p>
        </div>
      </div>

      <Link
        to={`/jobs/${job._id || job.id}`}
        className="mt-6 inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-cyan-500 hover:text-slate-950"
      >
        View details
        <FaArrowRight />
      </Link>
    </motion.article>
  );
};

export default Jobs;
