import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaAward, FaBriefcase, FaBullseye, FaEye, FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: FaBullseye,
      title: "Our mission",
      text: "Simplify hiring by connecting skilled professionals with verified companies and practical career tools.",
    },
    {
      icon: FaEye,
      title: "Our vision",
      text: "Become a trusted career platform where candidates and recruiters can move with clarity and confidence.",
    },
  ];

  const strengths = [
    { icon: FaUsers, title: "50,000+ users", text: "A growing community of candidates and hiring teams." },
    { icon: FaBriefcase, title: "10,000+ jobs", text: "Fresh roles across software, design, marketing, data, and more." },
    { icon: FaShieldAlt, title: "Verified platform", text: "Cleaner workflows, safer hiring, and trusted recruiter access." },
    { icon: FaAward, title: "Career tools", text: "Resume builder and ATS checker to improve application quality." },
  ];

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.25),transparent_30%),radial-gradient(circle_at_90%_5%,rgba(244,63,94,.18),transparent_26%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-2xl text-slate-950">
            <FaRocket />
          </div>
          <h1 className="text-4xl font-black sm:text-6xl">About HireNest</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A modern MERN recruitment platform helping professionals discover roles, improve resumes, and connect with recruiters faster.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Who we are</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Built for serious career movement.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              HireNest brings job search, recruiter tools, resume building, ATS analysis, and application management into one focused experience.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                  <value.icon />
                </div>
                <h3 className="text-xl font-black">{value.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Why choose us</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Designed around real hiring workflows.</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <item.icon />
                </div>
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-slate-950 p-8 text-center text-white sm:p-10 lg:flex-row lg:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Take the next step</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Start building your next career move today.</h2>
          </div>
          <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 transition hover:bg-cyan-300">
            Browse jobs
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
