import React, { useState, useEffect } from "react";
import api from "../services/api";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaSave, FaDownload, FaUserTie } from "react-icons/fa";

const ResumeBuilder = () => {
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    summary: "",
    school: "",
    degree: "",
    company: "",
    position: "",
    skills: "",
    projects: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // ✅ Fetch Existing Resume
  useEffect(() => {
    if (!user) return;

    const fetchResume = async () => {
      try {
        const { data: res } = await api.get(`/resume/${user._id}`);
        if (res?.data) setData(res.data);
      } catch (err) {
        console.log("No previous resume found");
      }
    };

    fetchResume();
  }, []);

  // ✅ Save Resume
  const saveResume = async () => {
    if (!user) return alert("Login first");

    try {
      setLoading(true);
      await api.post("/resume", {
        userId: user._id,
        data
      });
      alert("Resume Saved Successfully!");
    } catch (err) {
      alert("Error saving resume");
    } finally {
      setLoading(false);
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    
    try {
      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("Professional_Resume.pdf");
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 flex items-center justify-center gap-3">
        <FaUserTie /> Professional Resume Builder
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-6 text-indigo-700">
            Fill Your Details
          </h2>

          <Input name="firstName" value={data.firstName} placeholder="First Name" onChange={handleChange}/>
          <Input name="lastName" value={data.lastName} placeholder="Last Name" onChange={handleChange}/>
          <Input name="jobTitle" value={data.jobTitle} placeholder="Professional Title" onChange={handleChange}/>
          <Input name="email" value={data.email} placeholder="Email" onChange={handleChange}/>
          <Input name="phone" value={data.phone} placeholder="Phone" onChange={handleChange}/>
          <Textarea name="summary" value={data.summary} placeholder="Professional Summary" onChange={handleChange}/>
          <Input name="school" value={data.school} placeholder="School / University" onChange={handleChange}/>
          <Input name="degree" value={data.degree} placeholder="Degree" onChange={handleChange}/>
          <Input name="company" value={data.company} placeholder="Company Name" onChange={handleChange}/>
          <Input name="position" value={data.position} placeholder="Position" onChange={handleChange}/>
          <Textarea name="skills" value={data.skills} placeholder="Skills (comma separated)" onChange={handleChange}/>
          <Textarea name="projects" value={data.projects} placeholder="Projects" onChange={handleChange}/>

          <div className="flex gap-4 mt-6">
            <button
              onClick={saveResume}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <FaSave />
              {loading ? "Saving..." : "Save Resume"}
            </button>

            <button
              onClick={downloadPDF}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <FaDownload />
              Download PDF
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div
          id="resume-preview"
          className="bg-white p-10 rounded-3xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-indigo-700">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-gray-600 mb-4">{data.jobTitle}</p>

          <Divider />

          <Section title="Summary" content={data.summary} />
          <Section title="Education" content={`${data.school} - ${data.degree}`} />
          <Section title="Experience" content={`${data.company} - ${data.position}`} />
          <Section title="Skills" content={data.skills} />
          <Section title="Projects" content={data.projects} />
        </div>

      </div>
    </div>
  );
};

/* Reusable Components */

const Input = ({ name, value, placeholder, onChange }) => (
  <input
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
  />
);

const Textarea = ({ name, value, placeholder, onChange }) => (
  <textarea
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    rows={3}
    className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
  />
);

const Section = ({ title, content }) =>
  content ? (
    <div className="mt-4">
      <h3 className="font-bold text-indigo-600">{title}</h3>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  ) : null;

const Divider = () => (
  <hr className="my-4 border-gray-200" />
);

export default ResumeBuilder;
