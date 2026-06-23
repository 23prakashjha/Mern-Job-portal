import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaArrowRight,
  FaAward,
  FaBriefcase,
  FaBuilding,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFileAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaQuoteLeft,
  FaSearch,
  FaShieldAlt,
  FaStar,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <main className="overflow-hidden bg-slate-50 text-slate-900">
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

      <section className="py-20 sm:py-24">
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
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-xl"
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
