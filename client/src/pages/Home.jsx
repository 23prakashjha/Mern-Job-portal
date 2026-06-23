import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaArrowRight,
  FaAward,
  FaBell,
  FaBookOpen,
  FaBriefcase,
  FaBuilding,
  FaBullhorn,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaCheckDouble,
  FaClock,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaEnvelope,
  FaFileAlt,
  FaGlobe,
  FaGraduationCap,
  FaHandshake,
  FaHeadset,
  FaHeart,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaMobile,
  FaPaintBrush,
  FaPaperPlane,
  FaPlay,
  FaQuestionCircle,
  FaQuoteLeft,
  FaRocket,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaTrophy,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import google from "../assets/Google.png";
import airbnb from "../assets/airbnb.png";
import Amazon from "../assets/Amazon.png";
import apple from "../assets/apple.png";
import instagram from "../assets/instagram.png";
import microsoft from "../assets/microsoft.png";
import netflix from "../assets/netflix.png";
import spotify from "../assets/spotify.png";
import starbucks from "../assets/starbucks.png";
import telegram from "../assets/telegram.png";
import Tesla from "../assets/Tesla.png";
import twitter from "../assets/twitter.png";
import Uber from "../assets/Uber.png";
import youtube from "../assets/youtube.png";
import Adobe from "../assets/Adobe.png";
import meta from "../assets/meta.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Counter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1600;

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const companies = [
    { name: "Google", logo: google },
    { name: "Microsoft", logo: microsoft },
    { name: "Amazon", logo: Amazon },
    { name: "Meta", logo: meta },
    { name: "Apple", logo: apple },
    { name: "Netflix", logo: netflix },
    { name: "Adobe", logo: Adobe },
    { name: "Uber", logo: Uber },
    { name: "Airbnb", logo: airbnb },
    { name: "Tesla", logo: Tesla },
    { name: "Instagram", logo: instagram },
    { name: "Starbucks", logo: starbucks },
    { name: "Twitter", logo: twitter },
    { name: "YouTube", logo: youtube },
    { name: "Telegram", logo: telegram },
    { name: "Spotify", logo: spotify },
  ];

  const featuredJobs = [
    {
      title: "Frontend Developer",
      company: "Nova Labs",
      location: "Bengaluru",
      type: "Remote",
      salary: "Rs 9L - 14L",
      accent: "bg-cyan-500",
    },
    {
      title: "Product Designer",
      company: "Pixel Forge",
      location: "Mumbai",
      type: "Hybrid",
      salary: "Rs 8L - 12L",
      accent: "bg-rose-500",
    },
    {
      title: "Data Analyst",
      company: "CloudMetric",
      location: "Pune",
      type: "Full-time",
      salary: "Rs 7L - 11L",
      accent: "bg-amber-500",
    },
  ];

  const features = [
    {
      icon: FaSearch,
      title: "Smart job discovery",
      desc: "Find roles by title, category, location, salary, and work mode.",
    },
    {
      icon: FaFileAlt,
      title: "Resume tools",
      desc: "Build polished resumes and check ATS readiness before applying.",
    },
    {
      icon: FaShieldAlt,
      title: "Verified recruiters",
      desc: "Apply confidently to listings from trusted hiring teams.",
    },
    {
      icon: FaChartLine,
      title: "Career momentum",
      desc: "Track applications and move faster from profile to offer.",
    },
  ];

  const steps = [
    { icon: FaUserCheck, title: "Create profile", desc: "Add your details, skills, resume, and work preferences." },
    { icon: FaSearch, title: "Match roles", desc: "Explore jobs filtered around your goals and experience." },
    { icon: FaPaperPlane, title: "Apply fast", desc: "Send applications with a clean profile and strong resume." },
    { icon: FaAward, title: "Get hired", desc: "Connect with recruiters and step into your next opportunity." },
  ];

  const testimonials = [
    {
      name: "Priya Verma",
      role: "UI/UX Designer",
      company: "TCS",
      img: "https://randomuser.me/api/portraits/women/31.jpg",
      review: "The ATS checker helped me improve my resume quickly, and I started receiving better interview calls.",
    },
    {
      name: "Aarav Sharma",
      role: "Frontend Developer",
      company: "Infosys",
      img: "https://randomuser.me/api/portraits/men/30.jpg",
      review: "The job search felt focused instead of noisy. I found relevant openings and got hired in three weeks.",
    },
    {
      name: "Sneha Reddy",
      role: "Data Analyst",
      company: "Deloitte",
      img: "https://randomuser.me/api/portraits/women/33.jpg",
      review: "Everything from profile setup to application tracking felt simple and professional.",
    },
    {
      name: "Rohan Mehta",
      role: "Backend Engineer",
      company: "Wipro",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "I liked how quickly I could compare roles by salary, location, and required experience.",
    },
  ];

  const jobCategories = [
    { icon: FaCode, title: "Software Engineering", count: "1,240 jobs", color: "bg-cyan-500" },
    { icon: FaDatabase, title: "Data Science", count: "890 jobs", color: "bg-rose-500" },
    { icon: FaLaptopCode, title: "Frontend Dev", count: "720 jobs", color: "bg-amber-500" },
    { icon: FaCloud, title: "Cloud Computing", count: "560 jobs", color: "bg-emerald-500" },
    { icon: FaMobile, title: "Mobile Dev", count: "430 jobs", color: "bg-purple-500" },
    { icon: FaChartBar, title: "Product Management", count: "380 jobs", color: "bg-indigo-500" },
    { icon: FaCogs, title: "DevOps", count: "340 jobs", color: "bg-teal-500" },
    { icon: FaPaintBrush, title: "UI/UX Design", count: "290 jobs", color: "bg-pink-500" },
    { icon: FaBullhorn, title: "Marketing", count: "250 jobs", color: "bg-orange-500" },
    { icon: FaHeadset, title: "Customer Support", count: "210 jobs", color: "bg-sky-500" },
    { icon: FaHandshake, title: "Sales", count: "190 jobs", color: "bg-lime-500" },
    { icon: FaGraduationCap, title: "Education", count: "160 jobs", color: "bg-violet-500" },
  ];

  const skillsInDemand = [
    { name: "React.js", level: 92 },
    { name: "Python", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 82 },
    { name: "AWS", level: 78 },
    { name: "Docker", level: 74 },
    { name: "Machine Learning", level: 70 },
    { name: "Kubernetes", level: 65 },
    { name: "GraphQL", level: 60 },
    { name: "Go", level: 55 },
  ];

  const salaryInsights = [
    { role: "Frontend Developer", range: "Rs 6L - 18L", growth: "+24%" },
    { role: "Backend Developer", range: "Rs 7L - 22L", growth: "+28%" },
    { role: "Data Scientist", range: "Rs 10L - 30L", growth: "+35%" },
    { role: "DevOps Engineer", range: "Rs 8L - 25L", growth: "+30%" },
    { role: "Product Manager", range: "Rs 12L - 35L", growth: "+22%" },
    { role: "UI/UX Designer", range: "Rs 5L - 15L", growth: "+20%" },
  ];

  const whyHireNest = [
    { icon: FaRocket, title: "Lightning Fast Apply", desc: "Submit applications in under 60 seconds with auto-filled profiles." },
    { icon: FaShieldAlt, title: "Verified Employers Only", desc: "Every recruiter is company-verified before posting any job." },
    { icon: FaFileAlt, title: "ATS-Optimized Resumes", desc: "Built-in ATS checker ensures your resume passes screening filters." },
    { icon: FaBell, title: "Smart Job Alerts", desc: "Get notified in real-time when roles matching your profile go live." },
    { icon: FaChartLine, title: "Application Tracking", desc: "Track every application status from submitted to offer letter." },
    { icon: FaUsers, title: "Expert Community", desc: "Connect with peers, mentors, and industry professionals." },
  ];

  const faqs = [
    { q: "How do I create an account?", a: "Click 'User Login' in the top right, fill in your details, and verify your email. Your profile is ready in under two minutes." },
    { q: "Is the resume builder free?", a: "Yes, the resume builder and ATS checker are completely free for all registered users with unlimited downloads." },
    { q: "How are jobs verified?", a: "Every job listing goes through manual review. Recruiters must verify their company email and profile before posting." },
    { q: "Can recruiters contact me?", a: "Recruiters can reach out based on your profile visibility settings. You control who sees your contact information." },
    { q: "How does the ATS check work?", a: "Upload your resume and our tool scores it against real ATS criteria used by major hiring platforms." },
    { q: "Is my data secure?", a: "We use end-to-end encryption, secure authentication, and never share your data without explicit consent." },
  ];

  const careerResources = [
    { icon: FaBookOpen, title: "Resume Writing Guide", desc: "Learn how to craft resumes that pass ATS filters and impress hiring managers.", tag: "Guide" },
    { icon: FaPlay, title: "Interview Prep Series", desc: "Video tutorials covering behavioral questions, technical rounds, and salary negotiation.", tag: "Video" },
    { icon: FaGraduationCap, title: "Skill Development", desc: "Curated courses and certifications recommended by top industry recruiters.", tag: "Courses" },
    { icon: FaChartBar, title: "Salary Negotiation", desc: "Data-backed strategies to help you negotiate better compensation packages.", tag: "Tips" },
  ];

  const remoteWorkData = [
    { icon: FaLaptopCode, title: "Remote Developers", desc: "Work from anywhere with top companies hiring remote engineering talent across India." },
    { icon: FaMobile, title: "Flexible Schedules", desc: "Async workflows and flexible hours let you design your ideal workday." },
    { icon: FaGlobe, title: "Global Opportunities", desc: "Remote roles from international companies with competitive global compensation." },
    { icon: FaUsers, title: "Digital Collaboration", desc: "Modern tools and practices that keep remote teams connected and productive." },
  ];

  const diversityData = [
    { icon: FaUsers, title: "Equal Opportunity", desc: "We promote inclusive hiring practices and partner with companies committed to diversity." },
    { icon: FaHeart, title: "Safe Workplace", desc: "Every listed company signs our code of conduct for respectful hiring." },
    { icon: FaGlobe, title: "Pan-India Access", desc: "Connecting talent from metro cities to tier-2 and tier-3 towns with equal opportunity." },
    { icon: FaHandshake, title: "Inclusive Culture", desc: "Featured companies with proven diversity initiatives and inclusive benefits." },
  ];

  const partners = [
    google, microsoft, Amazon, meta, apple, netflix, Adobe, Uber,
    airbnb, Tesla, instagram, starbucks, twitter, youtube, telegram, spotify,
  ];

  const locations = [
    { city: "Bengaluru", jobs: "3,240", color: "bg-cyan-500" },
    { city: "Mumbai", jobs: "2,180", color: "bg-rose-500" },
    { city: "Delhi/NCR", jobs: "1,950", color: "bg-amber-500" },
    { city: "Hyderabad", jobs: "1,720", color: "bg-emerald-500" },
    { city: "Pune", jobs: "1,480", color: "bg-purple-500" },
    { city: "Chennai", jobs: "1,120", color: "bg-indigo-500" },
    { city: "Kolkata", jobs: "680", color: "bg-teal-500" },
    { city: "Ahmedabad", jobs: "540", color: "bg-pink-500" },
  ];

  const growthTools = [
    { icon: FaFileAlt, title: "Resume Builder", desc: "Drag-and-drop builder with ATS-optimized templates." },
    { icon: FaSearch, title: "ATS Checker", desc: "Score your resume against applicant tracking systems." },
    { icon: FaChartLine, title: "Skill Assessment", desc: "Evaluate your skills with industry-benchmarked tests." },
    { icon: FaGraduationCap, title: "Career Paths", desc: "Explore role progressions and required skill roadmaps." },
    { icon: FaBookOpen, title: "Interview Prep", desc: "Curated guides for coding, system design, and HR rounds." },
    { icon: FaCheckDouble, title: "Mock Tests", desc: "Practice with real interview questions from top companies." },
  ];

  const achievements = [
    { icon: FaTrophy, value: "50K+", label: "Candidates placed" },
    { icon: FaBuilding, value: "1200+", label: "Companies hiring" },
    { icon: FaBriefcase, value: "10K+", label: "Active jobs" },
    { icon: FaStar, value: "4.8", label: "User rating", suffix: "" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden bg-slate-50 text-slate-900">
      {/* 01 — Hero */}
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_45%,#312e81_100%)] text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.16)_50%,transparent_100%)]" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/30" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/20" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.05fr_.95fr] lg:py-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
              <FaCheckCircle className="text-emerald-300" />
              Trusted by candidates and recruiters
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              Find better jobs with a sharper career profile.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              HireNest brings job search, resume building, ATS checks, and recruiter workflows into one responsive hiring platform.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 shadow-2xl shadow-cyan-950/30 transition hover:bg-cyan-300">
                Explore jobs
                <FaArrowRight />
              </Link>
              <Link to="/resume-builder" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                Build resume
                <FaFileAlt />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: 10000, label: "Active jobs" },
                { value: 50000, label: "Candidates" },
                { value: 1200, label: "Recruiters" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="text-2xl font-black sm:text-3xl">
                    <Counter target={stat.value} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-300 sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-white/15 bg-white/12 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-white p-4 text-slate-900 shadow-xl sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">Live roles</p>
                    <h2 className="mt-1 text-2xl font-black">Recommended for you</h2>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <FaBriefcase />
                  </div>
                </div>

                <div className="space-y-4">
                  {featuredJobs.map((job) => (
                    <div key={job.title} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-xl">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 h-11 w-11 rounded-2xl ${job.accent} flex shrink-0 items-center justify-center text-white shadow-lg`}>
                          <FaBuilding />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-black text-slate-950">{job.title}</h3>
                              <p className="text-sm font-medium text-slate-500">{job.company}</p>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{job.type}</span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                            <span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-rose-500" />{job.location}</span>
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-300">ATS score improved</p>
                      <p className="text-3xl font-black text-cyan-300">86%</p>
                    </div>
                    <div className="h-16 w-16 rounded-full border-[10px] border-cyan-300 border-r-slate-700" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 — Company Carousel */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={28}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3500}
            loop
            allowTouchMove={false}
            breakpoints={{ 0: { slidesPerView: 2 }, 640: { slidesPerView: 3 }, 1024: { slidesPerView: 6 } }}
          >
            {[...companies, ...companies].map((company, index) => (
              <SwiperSlide key={`${company.name}-${index}`}>
                <div className="flex h-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 px-5">
                  <img src={company.logo} alt={company.name} loading="lazy" className="max-h-9 max-w-full object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 03 — Job Categories */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Browse by category</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Explore jobs across top categories.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">From engineering to marketing, find your next role by category.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jobCategories.map((cat) => (
              <Link
                to="/jobs"
                key={cat.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${cat.color} text-white shadow-lg`}>
                  <cat.icon />
                </div>
                <h3 className="font-black text-slate-950">{cat.title}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Platform Advantages */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Platform advantages</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Everything job seekers need, without the clutter.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">A practical, responsive experience that helps users search, prepare, apply, and track progress.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                  <feature.icon />
                </div>
                <h3 className="text-lg font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Skills in Demand */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Trending skills</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Skills employers want most right now.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Stay competitive by mastering the technologies and tools driving hiring demand across India.</p>
              <Link to="/jobs" className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">
                Browse jobs by skill
                <FaArrowRight />
              </Link>
            </div>

            <div className="space-y-4">
              {skillsInDemand.map((skill) => (
                <div key={skill.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-black text-slate-950">{skill.name}</span>
                    <span className="text-sm font-bold text-cyan-600">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — How It Works */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">How it works</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">From profile to offer in four clear steps.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Guide users through the core workflow with a page that looks great on desktop and stays clean on mobile.</p>
            <Link to="/login" className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">
              Start now
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-sm">
                    <step.icon />
                  </div>
                  <span className="text-4xl font-black text-slate-200">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Salary Insights */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Salary insights</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Know your worth in the market.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Transparent salary ranges and growth trends across roles in India.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
              <div className="bg-slate-950 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-wider">Role</p>
              </div>
              <div className="bg-slate-950 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-wider">Salary range</p>
              </div>
              <div className="bg-slate-950 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-wider">Growth vs last year</p>
              </div>
              {salaryInsights.map((item) => (
                <React.Fragment key={item.role}>
                  <div className="bg-white p-5 font-black text-slate-950">{item.role}</div>
                  <div className="bg-white p-5 font-semibold text-slate-700">{item.range}</div>
                  <div className="bg-white p-5">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{item.growth}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Why HireNest */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Why HireNest</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Built for modern job seekers.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">We combine speed, transparency, and powerful tools to give you an edge.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyHireNest.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-rose-200 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg">
                  <item.icon />
                </div>
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Testimonials */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Success stories</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Professionals are moving faster with HireNest.</h2>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
              <FaClock className="text-cyan-600" />
              New opportunities added weekly
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <FaQuoteLeft className="mb-5 text-2xl text-cyan-500" />
                  <p className="leading-8 text-slate-700">"{item.review}"</p>
                  <div className="mt-6 flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-black">{item.name}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.role} at {item.company}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, index) => <FaStar key={index} />)}
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Got questions? We have answers.</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-slate-950 transition hover:bg-slate-100"
                >
                  {faq.q}
                  <FaQuestionCircle className={`shrink-0 text-cyan-500 transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-slate-200 px-5 pb-5 pt-4 leading-7 text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Career Resources */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Career resources</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Tools and guides to level up.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">From resume writing to interview prep, we have you covered.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careerResources.map((res) => (
              <article key={res.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                    <res.icon />
                  </div>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">{res.tag}</span>
                </div>
                <h3 className="text-lg font-black">{res.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{res.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Download App */}
      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Mobile app</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Your job search on the go.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Apply, track, and chat with recruiters from anywhere with the HireNest mobile app.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:bg-slate-200">
                <FaMobile /> App Store
              </Link>
              <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                <FaMobile /> Google Play
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-80 w-64 items-center justify-center rounded-[3rem] border-4 border-slate-700 bg-slate-800 p-4 shadow-2xl">
              <FaRocket className="text-6xl text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 13 — Remote Work */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Remote & flexible</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Work from anywhere you choose.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Remote and hybrid roles from companies that trust you to do your best work.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {remoteWorkData.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg">
                  <item.icon />
                </div>
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — Diversity & Inclusion */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {diversityData.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <item.icon />
                  </div>
                  <h3 className="text-lg font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">Diversity & inclusion</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">A platform that works for everyone.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">We are committed to fair hiring practices and connecting talent from all backgrounds with opportunities that respect and value them.</p>
              <Link to="/jobs" className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">
                Explore inclusive jobs
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15 — Trusted Partners */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Trusted partners</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Backed by industry leaders.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Top companies trust HireNest to find their next great hires.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {partners.map((logo, index) => (
              <div key={index} className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <img src={logo} alt="Partner" className="max-h-10 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16 — Locations */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Hiring locations</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Jobs across top Indian cities.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Find opportunities near you or explore new cities with thriving tech and business hubs.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link
                to="/jobs"
                key={loc.city}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-950">{loc.city}</h3>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${loc.color} text-sm font-black text-white`}>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-500">{loc.jobs} jobs available</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-cyan-600 opacity-0 transition group-hover:opacity-100">
                  View jobs <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 17 — Career Growth Tools */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Growth tools</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Everything you need to grow.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">From resume building to mock interviews — level up your career toolkit.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {growthTools.map((tool) => (
              <motion.article
                key={tool.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                  <tool.icon />
                </div>
                <h3 className="text-lg font-black">{tool.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{tool.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 18 — Community Numbers */}
      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Our community</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Trusted by thousands across India.</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-2xl text-slate-950">
                  <item.icon />
                </div>
                <div className="text-4xl font-black text-cyan-300">{item.value}{item.suffix !== undefined ? item.suffix : "+"}</div>
                <p className="mt-2 text-sm font-semibold text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19 — Newsletter */}
      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-2xl text-slate-950">
            <FaEnvelope />
          </div>
          <h2 className="text-3xl font-black sm:text-5xl">Stay ready for the next opening.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">Get hiring updates, career tips, and fresh job alerts in your inbox.</p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="min-h-14 flex-1 rounded-xl border border-white/10 bg-white px-4 font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
            />
            <button type="submit" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-cyan-400 px-6 font-black text-slate-950 transition hover:bg-cyan-300">
              Subscribe
              <FaArrowRight />
            </button>
          </form>
        </div>
      </section>

      {/* 20 — Bottom CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">Ready when you are</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Build your profile and start applying today.</h2>
          </div>
          <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white transition hover:bg-slate-800">
            Browse jobs
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
