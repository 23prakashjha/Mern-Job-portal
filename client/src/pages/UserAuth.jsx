import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaRocket, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const UserAuth = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const toggleMode = () => {
    setForm({ name: "", email: "", password: "" });
    setIsLogin((value) => !value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success("Login successful");
      } else {
        await api.post("/auth/register", form);
        toast.success("Registered successfully. Please login.");
        toggleMode();
      }
    } catch (err) {
      console.error("Auth Error:", err);
      if (err.response) {
        toast.error(err.response.data?.message || "Server error");
      } else if (err.request) {
        toast.error("Server not responding. Please try again.");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://job-portal-wizd.onrender.com/api/auth/google";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_460px] lg:items-center">
        <div className="hidden lg:block">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">Welcome to HireNest</p>
          <h1 className="mt-4 max-w-2xl text-6xl font-black leading-tight">Your profile is the start of your next opportunity.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Sign in to apply faster, build resumes, check ATS performance, and keep your job search organized.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
            {["Fast apply", "ATS tools", "Verified roles"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-center font-black shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10 sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-cyan-300">
                <FaRocket />
              </div>
              <h2 className="text-3xl font-black">{isLogin ? "Welcome back" : "Create account"}</h2>
              <p className="mt-2 text-slate-500">{isLogin ? "Sign in to continue your search." : "Join HireNest and start applying."}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Field icon={FaUser}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </Field>
              )}

              <Field icon={FaEnvelope}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email address"
                  onChange={handleChange}
                  required
                  className="auth-input"
                />
              </Field>

              <Field icon={FaLock}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="auth-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-cyan-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign in" : "Create account"}
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4 text-sm font-bold text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              OR
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 transition hover:border-cyan-200 hover:bg-slate-50"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            <p className="mt-7 text-center text-slate-600">
              {isLogin ? "Do not have an account?" : "Already have an account?"}
              <button onClick={toggleMode} className="ml-2 font-black text-cyan-700 hover:text-cyan-600">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

const Field = ({ icon: Icon, children }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
    {children}
  </div>
);

export default UserAuth;
