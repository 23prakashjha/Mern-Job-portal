import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaClock,
  FaGlobe,
  FaBuilding,
  FaUsers,
  FaQuestionCircle,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactChannels = [
    { icon: FaEnvelope, title: "Email us", detail: "support@hirenest.com", desc: "We reply within 24 hours" },
    { icon: FaPhone, title: "Call us", detail: "+91 98765 43210", desc: "Mon–Fri, 9 AM – 6 PM IST" },
    { icon: FaMapMarkerAlt, title: "Office", detail: "Bengaluru, India", desc: "India's tech capital" },
    { icon: FaClock, title: "Hours", detail: "9 AM – 6 PM IST", desc: "Monday – Friday" },
  ];

  const faqs = [
    { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot password'. We will send a reset link to your registered email within a few minutes." },
    { q: "Can I delete my account?", a: "Yes, go to Settings > Account and click 'Delete account'. Your data will be permanently removed within 30 days." },
    { q: "How do I report a suspicious job?", a: "Forward the job link to support@hirenest.com or use the 'Report' button on the job listing page." },
    { q: "Do you offer enterprise plans?", a: "Yes, we offer custom plans for companies with bulk hiring needs. Reach out to our sales team for a demo." },
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FaTwitter, label: "Twitter", color: "hover:bg-sky-500" },
    { icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: FaInstagram, label: "Instagram", color: "hover:bg-pink-600" },
  ];

  return (
    <main className="overflow-hidden bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_45%,#312e81_100%)] py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.16)_50%,transparent_100%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
              <FaHeadset className="text-cyan-300" />
              Get in touch
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-black sm:text-6xl lg:text-7xl">
              We are here to help.
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Have a question, feedback, or need support? Reach out and our team will get back to you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="-mt-10 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((channel) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg">
                  <channel.icon />
                </div>
                <h3 className="font-black text-slate-950">{channel.title}</h3>
                <p className="mt-1 font-semibold text-cyan-600">{channel.detail}</p>
                <p className="mt-1 text-sm text-slate-500">{channel.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Send a message</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Drop us a line.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Fill in the form and our team will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
                />
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-8 font-black text-slate-950 shadow-lg shadow-cyan-900/20 transition hover:bg-cyan-300"
                >
                  {submitted ? "Sent!" : "Send message"}
                  {submitted ? <FaCheckCircle /> : <FaPaperPlane />}
                </button>
                {submitted && (
                  <p className="flex items-center gap-2 font-semibold text-emerald-600">
                    <FaCheckCircle /> Thank you! We will get back to you soon.
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-950">Connect with us</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Follow HireNest on social media for hiring updates, career tips, and company news.</p>
                <div className="mt-5 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition ${social.color} hover:text-white`}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-950">Office</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  HireNest Technologies Pvt. Ltd.<br />
                  IndiQube Alpha, Outer Ring Road<br />
                  Bengaluru, Karnataka 560103<br />
                  India
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-cyan-600">
                  <FaGlobe /> www.hirenest.com
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-950">Team</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-sm font-black text-white">SK</div>
                    <div>
                      <p className="font-bold text-slate-950">Support</p>
                      <p className="text-xs text-slate-500">support@hirenest.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-sm font-black text-white">PR</div>
                    <div>
                      <p className="font-bold text-slate-950">Press & Media</p>
                      <p className="text-xs text-slate-500">press@hirenest.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-black text-white">BD</div>
                    <div>
                      <p className="font-bold text-slate-950">Partnerships</p>
                      <p className="text-xs text-slate-500">partners@hirenest.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Quick answers</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Frequently asked questions.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-black text-slate-950 transition hover:bg-slate-50">
                  {faq.q}
                  <FaQuestionCircle className="shrink-0 text-rose-500 transition group-open:rotate-180" />
                </summary>
                <div className="border-t border-slate-200 px-5 pb-5 pt-4 leading-7 text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">Start today</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Create your free account and find your next role.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/login" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 transition hover:bg-cyan-300">
              Get started
              <FaArrowRight />
            </Link>
            <Link to="/jobs" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
              Browse jobs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
