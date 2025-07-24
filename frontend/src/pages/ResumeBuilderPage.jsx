// src/pages/ResumeBuilderPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Import all section components
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import HackathonsAndAchievementsSection from '../components/HackathonsAndAchievementsSection';
import ProfessionalDevelopmentSection from '../components/ProfessionalDevelopmentSection';
import LicensesAndCertificationsSection from '../components/LicensesAndCertificationsSection';
import ExtraCurricularActivitiesAndHobbiesSection from '../components/ExtraCurricularActivitiesAndHobbiesSection';
import InterestsSection from '../components/InterestsSection';
import CustomSections from '../components/CustomSections';
import ResumePreview from '../components/ResumePreview'; // Import the new ResumePreview component

// PDF Libraries
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function ResumeBuilderPage() {
  const navigate = useNavigate();
  const resumePreviewRef = useRef(null); // Ref to target the resume preview HTML
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
  const [loading, setLoading] = useState(false); // For saving resume
  const [fetchLoading, setFetchLoading] = useState(true); // For initial data fetch
  const [downloadLoading, setDownloadLoading] = useState(false); // For PDF download

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


  // --- Fetch existing resume data on component mount ---
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

        if (response.ok && data.success && data.resume) {
          const { user, ...restOfResume } = data.resume;
          const formattedData = {
              education: restOfResume.education || [],
              skills: (restOfResume.skills || []).map(s => ({ heading: s.heading || '', items: s.items || [] })),
              projects: (restOfResume.projects || []).map(p => ({ ...p, technologies: p.technologies || [] })),
              hackathonsAndAchievements: restOfResume.hackathonsAndAchievements || [],
              professionalDevelopment: restOfResume.professionalDevelopment || [],
              licensesAndCertifications: restOfResume.licensesAndCertifications || [],
              extraCurricularActivitiesAndHobbies: restOfResume.extraCurricularActivitiesAndHobbies || [],
              interests: restOfResume.interests || [],
              customSections: restOfResume.customSections || [],
          };
          setResumeData(formattedData);
          setMessage('Existing resume loaded!');
        } else if (response.status === 404 && data.success === false && data.message === 'No resume found for this user') {
          setMessage('Start building your new resume!');
        } else {
          setMessage(data.message || 'Failed to load resume. Server error.');
          console.error('Failed to load resume:', data.message || data);
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
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


  // --- Handlers for various sections (useCallback for performance) ---
  const handleEducationChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setResumeData(prevData => {
      const newEducation = [...prevData.education];
      newEducation[index] = { ...newEducation[index], [name]: value };
      return { ...prevData, education: newEducation };
    });
  }, []);

  const addEducation = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      education: [
        ...prevData.education,
        { institution: '', degree: '', years: '', details: '', location: '' },
      ],
    }));
  }, []);

  const removeEducation = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSkillsChange = useCallback((newSkillsArray) => {
    setResumeData(prevData => ({ ...prevData, skills: newSkillsArray }));
  }, []);

  const handleProjectsChange = useCallback((newProjectsArray) => {
    setResumeData(prevData => ({ ...prevData, projects: newProjectsArray }));
  }, []);

  const handleHackathonsChange = useCallback((newHackathonsArray) => {
    setResumeData(prevData => ({ ...prevData, hackathonsAndAchievements: newHackathonsArray }));
  }, []);
  const addHackathon = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      hackathonsAndAchievements: [
        ...prevData.hackathonsAndAchievements,
        { name: '', details: '', achievement: '' }
      ]
    }));
  }, []);
  const removeHackathon = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      hackathonsAndAchievements: prevData.hackathonsAndAchievements.filter((_, i) => i !== index)
    }));
  }, []);

  const handleProfessionalDevelopmentChange = useCallback((newDevelopmentArray) => {
    setResumeData(prevData => ({ ...prevData, professionalDevelopment: newDevelopmentArray }));
  }, []);
  const addProfessionalDevelopment = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      professionalDevelopment: [
        ...prevData.professionalDevelopment,
        { title: '', company: '', location: '', date: '', description: '' }
      ]
    }));
  }, []);
  const removeProfessionalDevelopment = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      professionalDevelopment: prevData.professionalDevelopment.filter((_, i) => i !== index)
    }));
  }, []);

  const handleLicensesChange = useCallback((newLicensesArray) => {
    setResumeData(prevData => ({ ...prevData, licensesAndCertifications: newLicensesArray }));
  }, []);
  const addLicense = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      licensesAndCertifications: [
        ...prevData.licensesAndCertifications,
        { name: '', issuer: '' }
      ]
    }));
  }, []);
  const removeLicense = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      licensesAndCertifications: prevData.licensesAndCertifications.filter((_, i) => i !== index)
    }));
  }, []);

  const handleActivitiesChange = useCallback((newActivitiesArray) => {
    setResumeData(prevData => ({ ...prevData, extraCurricularActivitiesAndHobbies: newActivitiesArray }));
  }, []);
  const addActivity = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      extraCurricularActivitiesAndHobbies: [
        ...prevData.extraCurricularActivitiesAndHobbies,
        { name: '', role: '', years: '', description: '' }
      ]
    }));
  }, []);
  const removeActivity = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      extraCurricularActivitiesAndHobbies: prevData.extraCurricularActivitiesAndHobbies.filter((_, i) => i !== index)
    }));
  }, []);

  const handleInterestsChange = useCallback((newInterestsArray) => {
    setResumeData(prevData => ({ ...prevData, interests: newInterestsArray }));
  }, []);
  const addInterest = useCallback(() => {
    setResumeData(prevData => ({ ...prevData, interests: [...prevData.interests, ''] }));
  }, []);
  const removeInterest = useCallback((index) => {
    setResumeData(prevData => ({ ...prevData, interests: prevData.interests.filter((_, i) => i !== index) }));
  }, []);

  const handleCustomSectionsChange = useCallback((newCustomSectionsArray) => {
    setResumeData(prevData => ({ ...prevData, customSections: newCustomSectionsArray }));
  }, []);
  const addCustomSection = useCallback(() => {
    setResumeData(prevData => ({
      ...prevData,
      customSections: [
        ...prevData.customSections,
        { heading: '', content: '' }
      ]
    }));
  }, []);
  const removeCustomSection = useCallback((index) => {
    setResumeData(prevData => ({
      ...prevData,
      customSections: prevData.customSections.filter((_, i) => i !== index)
    }));
  }, []);


  // --- Central AI Suggestion Function ---
  const onGenerateAISuggestion = useCallback(async (promptContext, userText, keywords, sectionType) => {
    const token = localStorage.getItem('token');
    if (!token) {
        setMessage('Authentication required for AI suggestions. Please log in.');
        navigate('/login');
        return null;
    }
    setMessage('');
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/generate-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({ promptContext, userText, keywords, sectionType }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setMessage('AI suggestions generated!');
            return { success: true, suggestions: data.suggestions };
        } else {
            setMessage(data.message || 'Failed to get AI suggestions from server.');
            console.error('AI Suggestion Error:', data.message || data);
            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            return { success: false, suggestions: [] };
        }
    } catch (error) {
        console.error('Network error requesting AI:', error);
        setMessage('Network error during AI suggestion request.');
        return { success: false, suggestions: [] };
    }
  }, [navigate]);


  // --- PDF Download Handler ---
  const handleDownloadPDF = async () => {
    setDownloadLoading(true);
    setMessage('');
    if (!resumePreviewRef.current) {
      setMessage('Error: Resume content not found for PDF generation.');
      setDownloadLoading(false);
      return;
    }

    try {
      const element = resumePreviewRef.current;
      // You might need to adjust scale for better quality/readability
      // scale: 2 for higher resolution
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('my-resume.pdf');
      setMessage('Resume downloaded successfully!');

    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessage('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };


  // --- Generic Submission Handler (Save Resume) ---
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

      if (response.ok && data.success) {
        setMessage('Resume saved successfully!');
        setResumeData(prevData => ({ ...prevData, ...data.resume }));
      } else {
        setMessage(data.message || 'Failed to save resume. Server error.');
        console.error('Save resume error:', data.message || data);
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
      {/* Timeline Sidebar */}
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
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={downloadLoading}
          >
            {downloadLoading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {message && (
          <p className={`text-center mb-4 ${message.includes('successful') || message.includes('loaded') || message.includes('generated') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <EducationSection
            education={resumeData.education}
            onEducationChange={handleEducationChange}
            onAddEducation={addEducation}
            onRemoveEducation={removeEducation}
          />
          <SkillsSection
            skills={resumeData.skills}
            onSkillsChange={handleSkillsChange}
          />
          <ProjectsSection
            projects={resumeData.projects}
            onProjectsChange={handleProjectsChange}
            onGenerateAISuggestion={onGenerateAISuggestion}
          />
          <HackathonsAndAchievementsSection
            hackathonsAndAchievements={resumeData.hackathonsAndAchievements}
            onHackathonsChange={handleHackathonsChange}
            onAddHackathon={addHackathon}
            onRemoveHackathon={removeHackathon}
          />
          <ProfessionalDevelopmentSection
            professionalDevelopment={resumeData.professionalDevelopment}
            onProfessionalDevelopmentChange={handleProfessionalDevelopmentChange}
            onAddProfessionalDevelopment={addProfessionalDevelopment}
            onRemoveProfessionalDevelopment={removeProfessionalDevelopment}
          />
          <LicensesAndCertificationsSection
            licensesAndCertifications={resumeData.licensesAndCertifications}
            onLicensesChange={handleLicensesChange}
            onAddLicense={addLicense}
            onRemoveLicense={removeLicense}
          />
          <ExtraCurricularActivitiesAndHobbiesSection
            extraCurricularActivitiesAndHobbies={resumeData.extraCurricularActivitiesAndHobbies}
            onActivitiesChange={handleActivitiesChange}
            onAddActivity={addActivity}
            onRemoveActivity={removeActivity}
          />
          <InterestsSection
            interests={resumeData.interests}
            onInterestsChange={handleInterestsChange}
            onAddInterest={addInterest}
            onRemoveInterest={removeInterest}
          />
          <CustomSections
            customSections={resumeData.customSections}
            onCustomSectionsChange={handleCustomSectionsChange}
            onAddCustomSection={addCustomSection}
            onRemoveCustomSection={removeCustomSection}
          />

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

      
      <div ref={resumePreviewRef} className="absolute left-[-9999px] top-[-9999px]">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}

export default ResumeBuilderPage;