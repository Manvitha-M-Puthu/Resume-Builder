// src/pages/ResumeBuilderPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ResumeBuilderPage.css'; // Import custom styles

import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import HackathonsAndAchievementsSection from '../components/HackathonsAndAchievementsSection';
import ProfessionalDevelopmentSection from '../components/ProfessionalDevelopmentSection';
import LicensesAndCertificationsSection from '../components/LicensesAndCertificationsSection';
import ExtraCurricularActivitiesAndHobbiesSection from '../components/ExtraCurricularActivitiesAndHobbiesSection';
import InterestsSection from '../components/InterestsSection';
import CustomSections from '../components/CustomSections';
import ResumePreview from '../components/ResumePreview';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function ResumeBuilderPage() {
  const navigate = useNavigate();
  const resumePreviewRef = useRef(null);

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
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('education');

  const resumeSections = [
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '💡' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'hackathons', name: 'Hackathons & Achievements', icon: '🏆' },
    { id: 'professionalDev', name: 'Professional Development', icon: '📈' },
    { id: 'certifications', name: 'Licenses & Certifications', icon: '📜' },
    { id: 'activities', name: 'Activities & Hobbies', icon: '🎨' },
    { id: 'interests', name: 'Interests', icon: '❤️' },
    { id: 'customSections', name: 'Custom Sections', icon: '⚙️' },
  ];

  useEffect(() => {
    const fetchResume = async () => {
      setFetchLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await fetch(`${API_BASE_URL}/api/resume/me`, {
          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        });
        const data = await res.json();

        if (res.ok && data.success && data.resume) {
          const { user, ...rest } = data.resume;
          setResumeData({
            education: rest.education || [],
            skills: (rest.skills || []).map(s => ({ heading: s.heading||'', items: s.items||[] })),
            projects: (rest.projects || []).map(p => ({ ...p, technologies: p.technologies||[] })),
            hackathonsAndAchievements: rest.hackathonsAndAchievements || [],
            professionalDevelopment: rest.professionalDevelopment || [],
            licensesAndCertifications: rest.licensesAndCertifications || [],
            extraCurricularActivitiesAndHobbies: rest.extraCurricularActivitiesAndHobbies || [],
            interests: rest.interests || [],
            customSections: rest.customSections || [],
          });
          setMessage('Existing resume loaded!');
        } else if (res.status === 404) {
          setMessage('Start building your new resume!');
        } else {
          if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
          setMessage(data.message || 'Failed to load resume.');
        }
      } catch (err) {
        console.error(err);
        setMessage('Network error during resume fetch.');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchResume();
  }, [navigate]);

  // Handler functions
  const handleEducationChange = useCallback((i, e) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const edu = [...prev.education];
      edu[i] = { ...edu[i], [name]: value };
      return { ...prev, education: edu };
    });
  }, []);

  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution:'', degree:'', years:'', details:'', location:'' }]
    }));
  }, []);

  const removeEducation = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleSkillsChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, skills: arr }));
  }, []);

  const handleProjectsChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, projects: arr }));
  }, []);

  const handleHackathonsChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, hackathonsAndAchievements: arr }));
  }, []);

  const addHackathon = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      hackathonsAndAchievements: [...prev.hackathonsAndAchievements, { name:'', details:'', achievement:'' }]
    }));
  }, []);

  const removeHackathon = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      hackathonsAndAchievements: prev.hackathonsAndAchievements.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleProfessionalDevelopmentChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, professionalDevelopment: arr }));
  }, []);

  const addProfessionalDevelopment = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      professionalDevelopment: [...prev.professionalDevelopment, { title:'', company:'', location:'', date:'', description:'' }]
    }));
  }, []);

  const removeProfessionalDevelopment = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      professionalDevelopment: prev.professionalDevelopment.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleLicensesChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, licensesAndCertifications: arr }));
  }, []);

  const addLicense = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      licensesAndCertifications: [...prev.licensesAndCertifications, { name:'', issuer:'' }]
    }));
  }, []);

  const removeLicense = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      licensesAndCertifications: prev.licensesAndCertifications.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleActivitiesChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, extraCurricularActivitiesAndHobbies: arr }));
  }, []);

  const addActivity = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      extraCurricularActivitiesAndHobbies: [...prev.extraCurricularActivitiesAndHobbies, { name:'', role:'', years:'', description:'' }]
    }));
  }, []);

  const removeActivity = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      extraCurricularActivitiesAndHobbies: prev.extraCurricularActivitiesAndHobbies.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleInterestsChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, interests: arr }));
  }, []);

  const addInterest = useCallback(() => {
    setResumeData(prev => ({ ...prev, interests: [...prev.interests, ''] }));
  }, []);

  const removeInterest = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, idx) => idx !== i)
    }));
  }, []);

  const handleCustomSectionsChange = useCallback(arr => {
    setResumeData(prev => ({ ...prev, customSections: arr }));
  }, []);

  const addCustomSection = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { heading:'', content:'' }]
    }));
  }, []);

  const removeCustomSection = useCallback(i => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, idx) => idx !== i)
    }));
  }, []);

  const onGenerateAISuggestion = useCallback(async (promptContext, userText, keywords, sectionType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Authentication required for AI suggestions. Please log in.');
      navigate('/login');
      return null;
    }

    setMessage('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/generate-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ promptContext, userText, keywords, sectionType }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('AI suggestions generated!');
        return { success: true, suggestions: data.suggestions };
      } else {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setMessage(data.message || 'Failed to get AI suggestions.');
        return { success: false, suggestions: [] };
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error during AI suggestion request.');
      return { success: false, suggestions: [] };
    }
  }, [navigate]);

  const handleDownloadPDF = async () => {
    setDownloadLoading(true);
    setMessage('');
    if (!resumePreviewRef.current) {
      setMessage('Error: Resume content not found for PDF.');
      setDownloadLoading(false);
      return;
    }
    try {
      const canvas = await html2canvas(resumePreviewRef.current, { scale:2, useCORS:true });
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const w = 210, h = (canvas.height * w)/canvas.width;
      let y = 0;
      pdf.addImage(img,'PNG',0,y,w,h);
      let left = h - 297;
      while (left > 0) {
        y = left - h;
        pdf.addPage();
        pdf.addImage(img,'PNG',0,y,w,h);
        left -= 297;
      }
      pdf.save('my-resume.pdf');
      setMessage('Resume downloaded successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to generate PDF.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_BASE_URL}/api/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(resumeData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('Resume saved successfully!');
        setResumeData(prev => ({ ...prev, ...data.resume }));
      } else {
        setMessage(data.message || 'Failed to save resume.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error during save.');
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
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h2 className="loading-title">Loading your resume...</h2>
        {message && <p className="loading-message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="resume-builder-page">
      <header className="builder-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="builder-title">Resume Builder</h1>
            <div className="progress-indicator">
              <span className="progress-text">Building your future</span>
              <div className="progress-bar"><div className="progress-fill"></div></div>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleDownloadPDF} disabled={downloadLoading} className="btn btn-secondary btn-download">
              {downloadLoading ? <span className="loading-spinner-small"></span> : '📄 Download PDF'}
            </button>
            <button onClick={handleSubmit} disabled={loading} className="btn btn-primary btn-save">
              {loading ? <span className="loading-spinner-small"></span> : '💾 Save Resume'}
            </button>
            <button onClick={handleLogout} className="btn btn-outline btn-logout">🚪 Logout</button>
          </div>
        </div>
      </header>

      {message && (
        <div className={`message-banner ${/successful|generated/.test(message) ? 'success' : 'error'} slide-down`}>
          <span className="message-icon">{/successful|generated/.test(message) ? '✅' : '⚠️'}</span>
          {message}
        </div>
      )}

      <div className="builder-layout">
        <aside className="builder-sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">Resume Sections</h3>
            <nav className="section-nav">
              {resumeSections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => { setActiveSection(sec.id); scrollToSection(sec.id); }}
                  className={`nav-item ${activeSection===sec.id ? 'active':''}`}
                >
                  <span className="nav-icon">{sec.icon}</span><span className="nav-text">{sec.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="builder-main">
          <div className="builder-content">
            <form onSubmit={handleSubmit} className="resume-form">
              
              {/* Education Section */}
              <section id="education" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">🎓</span> Education</h2>
                  <button type="button" onClick={addEducation} className="btn btn-add">+ Add Education</button>
                </div>
                <EducationSection
                  education={resumeData.education || []}
                  onEducationChange={handleEducationChange}
                  onRemoveEducation={removeEducation}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Skills Section */}
              <section id="skills" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">💡</span> Skills</h2>
                </div>
                <SkillsSection
                  skills={resumeData.skills || []}
                  onSkillsChange={handleSkillsChange}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Projects Section */}
              <section id="projects" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">🚀</span> Projects</h2>
                </div>
                <ProjectsSection
                  projects={resumeData.projects || []}
                  onProjectsChange={handleProjectsChange}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Hackathons Section - FIXED PROP NAME */}
              <section id="hackathons" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">🏆</span> Hackathons & Achievements</h2>
                  <button type="button" onClick={addHackathon} className="btn btn-add">+ Add Achievement</button>
                </div>
                <HackathonsAndAchievementsSection
                  hackathonsAndAchievements={resumeData.hackathonsAndAchievements || []}
                  onHackathonsChange={handleHackathonsChange}
                  onRemoveHackathon={removeHackathon}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Professional Development Section - FIXED PROP NAME */}
              <section id="professionalDev" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">📈</span> Professional Development</h2>
                  <button type="button" onClick={addProfessionalDevelopment} className="btn btn-add">+ Add Development</button>
                </div>
                <ProfessionalDevelopmentSection
                  professionalDevelopment={resumeData.professionalDevelopment || []}
                  onProfessionalDevelopmentChange={handleProfessionalDevelopmentChange}
                  onRemoveProfessionalDevelopment={removeProfessionalDevelopment}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Certifications Section - FIXED PROP NAME */}
              <section id="certifications" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">📜</span> Licenses & Certifications</h2>
                  <button type="button" onClick={addLicense} className="btn btn-add">+ Add Certification</button>
                </div>
                <LicensesAndCertificationsSection
                  licensesAndCertifications={resumeData.licensesAndCertifications || []}
                  onLicensesChange={handleLicensesChange}
                  onRemoveLicense={removeLicense}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Activities Section - FIXED PROP NAME */}
              <section id="activities" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">🎨</span> Activities & Hobbies</h2>
                  <button type="button" onClick={addActivity} className="btn btn-add">+ Add Activity</button>
                </div>
                <ExtraCurricularActivitiesAndHobbiesSection
                  extraCurricularActivitiesAndHobbies={resumeData.extraCurricularActivitiesAndHobbies || []}
                  onActivitiesChange={handleActivitiesChange}
                  onRemoveActivity={removeActivity}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Interests Section */}
              <section id="interests" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">❤️</span> Interests</h2>
                  <button type="button" onClick={addInterest} className="btn btn-add">+ Add Interest</button>
                </div>
                <InterestsSection
                  interests={resumeData.interests || []}
                  onInterestsChange={handleInterestsChange}
                  onRemoveInterest={removeInterest}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

              {/* Custom Sections */}
              <section id="customSections" className="form-section fade-in">
                <div className="section-header">
                  <h2 className="section-title"><span className="section-icon">⚙️</span> Custom Sections</h2>
                  <button type="button" onClick={addCustomSection} className="btn btn-add">+ Add Custom Section</button>
                </div>
                <CustomSections
                  customSections={resumeData.customSections || []}
                  onCustomSectionsChange={handleCustomSectionsChange}
                  onRemoveCustomSection={removeCustomSection}
                  onGenerateAISuggestion={onGenerateAISuggestion}
                />
              </section>

            </form>
          </div>
        </main>

        <aside className="preview-panel">
          <div className="preview-header">
            <h3 className="preview-title">Live Preview</h3>
            <div className="preview-actions">
              <button className="btn btn-sm btn-outline">📱 Mobile View</button>
            </div>
          </div>
          <div className="preview-content" ref={resumePreviewRef}>
            <ResumePreview resumeData={resumeData} />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ResumeBuilderPage;
