
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EducationSection from '../components/EducationSection';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; 

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    education: [],
    skills: [],
    projects: [],
    hackathonsAndAchievements: [],
    professionalDevelopment: [],
    licensesAndCertifications: [],
    extraCurricularActivitiesAndHobbies: [],
    interests: [],
    customSections: [],
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const resumeSections = [
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'hackathons', name: 'Hackathons & Achievements' },
    { id: 'professionalDev', name: 'Professional Development' },
    { id: 'certifications', name: 'Licenses & Certifications' },
    { id: 'activities', name: 'Activities & Hobbies' },
    { id: 'interests', name: 'Interests' },
    { id: 'customSections', name: 'Custom Sections' },
  ];

  useEffect(() => {
    const fetchResume = async () => {
      setFetchLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/resume/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const data = await response.json();

        if (data.success && data.resume) {
          const { user, ...restOfResume } = data.resume;
          setResumeData(prevData => ({ ...prevData, ...restOfResume }));
          setMessage('Existing resume loaded!');
        } else if (data.success === false && data.message === 'No resume found for this user') {
          setMessage('Start building your new resume!');
        } else {
          setMessage(data.message || 'Failed to load resume.');
          console.error('Failed to load resume:', data.message);
        }
      } catch (error) {
        console.error('Fetch resume error:', error);
        setMessage('Network error during resume fetch.');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchResume();
  }, [navigate]);


  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institution: '', degree: '', years: '', details: '', location: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(resumeData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Resume saved successfully!');
        setResumeData(prevData => ({ ...prevData, ...data.resume }));
      } else {
        setMessage(data.message || 'Failed to save resume.');
      }
    } catch (error) {
      console.error('Save resume error:', error);
      setMessage('Network error during resume save.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (fetchLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Loading your resume...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Timeline Sidebar (remains the same) */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-6 fixed overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">Resume Sections</h2>
        <ul className="space-y-4">
          {resumeSections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out text-lg"
              >
                {section.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">Build Your Resume!</h1>
        </div>

        {message && (
          <p className={`text-center mb-4 ${message.includes('successful') || message.includes('loaded') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Education Section - NOW USING THE COMPONENT */}
          <EducationSection
            education={resumeData.education}
            onEducationChange={handleEducationChange}
            onAddEducation={addEducation}
            onRemoveEducation={removeEducation}
          />

          {/* Skills Section */}
          <section id="skills" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills</h2>
            <p className="text-gray-600">This section will be refactored into a component next!</p>
          </section>

          {/* Projects Section */}
          <section id="projects" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Projects</h2>
            <p className="text-gray-600">This section will be refactored and include AI enhancement soon!</p>
          </section>

           {/* Hackathons and Achievements Section */}
           <section id="hackathons" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hackathons & Achievements</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Professional Development Section */}
          <section id="professionalDev" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Professional Development</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Licenses and Certifications Section */}
          <section id="certifications" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Licenses & Certifications</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Extra-Curricular Activities and Hobbies Section */}
          <section id="activities" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Extra-Curricular Activities & Hobbies</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Interests Section */}
          <section id="interests" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Interests</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Custom Sections */}
          <section id="customSections" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Custom Sections</h2>
            <p className="text-gray-600">This section will be refactored into a component!</p>
          </section>

          {/* Save Button */}
          <div className="flex justify-center mt-8 pb-8">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Saving Resume...' : 'Save Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeBuilderPage;