import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaTrash,
  FaCamera
} from "react-icons/fa";

const Settings = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    jobAlerts: true,
    newsletter: false,
    profilePublic: true,
    twoFactor: false,
    theme: "light"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUpdate = () => {
    alert("Settings Updated (Connect Backend API)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Account Settings ⚙️
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* PROFILE SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <SectionTitle icon={<FaUser />} title="Profile Information" />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Input name="name" placeholder="Full Name" onChange={handleChange} />
            <Input name="email" placeholder="Email Address" onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <FaCamera className="text-gray-500 text-xl" />
              </div>
              <input type="file" className="text-sm" />
            </div>
          </div>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <SectionTitle icon={<FaLock />} title="Change Password" />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Input
              type="password"
              name="password"
              placeholder="New Password"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <SectionTitle icon={<FaBell />} title="Notification Preferences" />

          <div className="space-y-4 mt-6">
            <Toggle
              label="Job Alerts"
              name="jobAlerts"
              checked={form.jobAlerts}
              onChange={handleChange}
            />
            <Toggle
              label="Newsletter Subscription"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PRIVACY */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <SectionTitle icon={<FaShieldAlt />} title="Privacy Settings" />

          <div className="space-y-4 mt-6">
            <Toggle
              label="Public Profile"
              name="profilePublic"
              checked={form.profilePublic}
              onChange={handleChange}
            />
            <Toggle
              label="Enable Two-Factor Authentication"
              name="twoFactor"
              checked={form.twoFactor}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACCOUNT PREFERENCES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <SectionTitle title="Account Preferences" />

          <div className="mt-6">
            <select
              name="theme"
              onChange={handleChange}
              className="w-full md:w-1/3 p-3 border rounded-xl"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200">
          <SectionTitle icon={<FaTrash />} title="Danger Zone" />

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              Delete your account permanently. This action cannot be undone.
            </p>

            <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="text-center">
          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

/* Reusable Components */

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-3 text-xl font-bold text-indigo-700">
    {icon}
    {title}
  </div>
);

const Input = ({ name, placeholder, onChange, type = "text" }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
  />
);

const Toggle = ({ label, name, checked, onChange }) => (
  <label className="flex justify-between items-center cursor-pointer">
    <span className="text-gray-700">{label}</span>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 accent-indigo-600"
    />
  </label>
);

export default Settings;

