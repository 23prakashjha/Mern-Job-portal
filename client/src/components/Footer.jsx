import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaRocket,
  FaShieldAlt,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { text: "Home", to: "/" },
    { text: "Find Jobs", to: "/jobs" },
    { text: "About", to: "/about" },
    { text: "Contact", to: "/contact" },
    { text: "Resume Builder", to: "/resume-builder" },
    { text: "ATS Check", to: "/resume-ats" },
  ];

  const recruiterLinks = [
    { text: "Recruiter Login", to: "/recruiter-auth" },
    { text: "Dashboard", to: "/recruiter/dashboard" },
    { text: "Company Profile", to: "/recruiter/company-profile" },
    { text: "Post Job", to: "/recruiter/add-job" },
    { text: "Applicants", to: "/recruiter/applicants" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaLinkedinIn, label: "LinkedIn" },
    { icon: FaInstagram, label: "Instagram" },
  ];

  const stats = [
    { icon: FaBriefcase, text: "10K+ Jobs" },
    { icon: FaUsers, text: "50K+ Users" },
    { icon: FaShieldAlt, text: "Verified Hiring" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Hire smarter</p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Ready to discover better opportunities?</h2>
            </div>
            <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-4 font-black text-slate-950 transition hover:bg-cyan-300">
              Explore jobs
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                <FaRocket />
              </span>
              <span className="text-3xl font-black text-white">
                Hire<span className="text-cyan-300">Nest</span>
              </span>
            </Link>
            <p className="max-w-md leading-8 text-slate-400">
              A modern MERN job portal for candidates, resume tools, ATS checks, recruiter dashboards, and faster hiring workflows.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:max-w-xl">
              {stats.map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold">
                  <item.icon className="text-cyan-300" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <FooterLinks title="Explore" links={quickLinks} />
          <FooterLinks title="Recruiters" links={recruiterLinks} />

          <div>
            <h3 className="mb-5 text-lg font-black text-white">Contact</h3>
            <div className="space-y-4 text-sm font-medium text-slate-400">
              <p className="flex items-center gap-3"><FaEnvelope className="text-cyan-300" /> support@hirenest.com</p>
              <p className="flex items-center gap-3"><FaPhone className="text-cyan-300" /> +91 98765 43210</p>
              <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-cyan-300" /> Bengaluru, India</p>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300 hover:bg-cyan-300 hover:text-slate-950"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center">
          <p>Copyright {currentYear} HireNest. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/cookies" className="transition hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLinks = ({ title, links }) => (
  <div>
    <h3 className="mb-5 text-lg font-black text-white">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
          <Link to={link.to} className="font-medium text-slate-400 transition hover:text-cyan-300">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
