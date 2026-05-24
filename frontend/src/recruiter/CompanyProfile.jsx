import React, { useEffect, useState, useRef } from "react";
import api from "../services/api"; // Axios instance with baseURL
import toast from "react-hot-toast";
import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaMapMarkerAlt,
  FaIndustry,
  FaUpload,
} from "react-icons/fa";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    company_size: "",
    website: "",
    location: "",
    about: "",
    logo: null, // file object
  });

  const previewRef = useRef(null);

  // Fetch company profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/recruiter/company-profile");

        // Handle logo: prepend base URL if backend returns relative path
        const logoUrl = res.data.logo
          ? `${process.env.REACT_APP_API_BASE_URL || ""}/${res.data.logo}`
          : null;

        setForm({ ...res.data, logo: null }); // reset file input
        setPreview(logoUrl);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load company profile");
      }
    };

    fetchProfile();

    return () => {
      // cleanup object URLs
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      const objectUrl = URL.createObjectURL(file);
      previewRef.current = objectUrl;
      setPreview(objectUrl);
      setForm({ ...form, logo: file });
    }
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append only non-null fields
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) formData.append(key, form[key]);
      });

      await api.put("/recruiter/company-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Company Profile Updated Successfully!");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Failed to update profile";
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-700 flex items-center gap-3">
          <FaBuilding className="text-green-600" />
          Company Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2 items-start"
        >
          {/* Company Name */}
          <InputField
            label="Company Name"
            name="company_name"
            value={form.company_name}
            icon={<FaBuilding className="text-gray-400" />}
            required
            onChange={handleChange}
          />

          {/* Industry */}
          <InputField
            label="Industry"
            name="industry"
            value={form.industry}
            icon={<FaIndustry className="text-gray-400" />}
            onChange={handleChange}
          />

          {/* Company Size */}
          <InputField
            label="Company Size"
            name="company_size"
            value={form.company_size}
            icon={<FaUsers className="text-gray-400" />}
            onChange={handleChange}
          />

          {/* Website */}
          <InputField
            label="Website"
            name="website"
            value={form.website}
            icon={<FaGlobe className="text-gray-400" />}
            onChange={handleChange}
          />

          {/* Location */}
          <InputField
            label="Location"
            name="location"
            value={form.location}
            icon={<FaMapMarkerAlt className="text-gray-400" />}
            onChange={handleChange}
          />

          {/* Logo Upload */}
          <div>
            <label className="font-semibold text-gray-600 mb-2 block">
              Company Logo
            </label>
            <div className="flex items-center gap-4">
              {preview && (
                <img
                  src={preview}
                  alt="Logo Preview"
                  className="w-24 h-24 rounded-xl object-cover border shadow-sm"
                />
              )}
              <label className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                <FaUpload /> Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          {/* About Company */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-600 mb-2 block">
              About Company
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
              placeholder="Write something about your company..."
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable InputField component
const InputField = ({ label, name, value, icon, required, onChange }) => (
  <div>
    <label className="font-semibold text-gray-600 mb-2 block">{label}</label>
    <div className="flex items-center border rounded-xl mt-2 px-3 focus-within:ring-2 focus-within:ring-green-400 transition">
      {icon}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 outline-none"
      />
    </div>
  </div>
);

export default CompanyProfile;
