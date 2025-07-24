// src/components/ResumePreview.jsx
import React from 'react';

function ResumePreview({ resumeData }) {
  const {
    education,
    skills,
    projects,
    hackathonsAndAchievements,
    professionalDevelopment,
    licensesAndCertifications,
    extraCurricularActivitiesAndHobbies,
    interests,
    customSections,
  } = resumeData;

  // Define simple, universally supported styles
  const containerStyle = {
    fontFamily: 'sans-serif',
    color: '#333333', // Dark gray for text
    padding: '2rem', // 32px
    lineHeight: '1.5',
    maxWidth: '700px', // Roughly max-w-2xl equivalent
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0', // Light gray border
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', // Simple shadow
  };

  const sectionStyle = {
    marginBottom: '1.5rem', // 24px
  };

  const headingStyle = {
    fontSize: '1.25rem', // text-xl
    fontWeight: 'bold',
    borderBottom: '2px solid #D0D0D0', // Light gray border-b-2
    paddingBottom: '0.25rem', // pb-1
    marginBottom: '0.75rem', // mb-3
  };

  const subHeadingStyle = {
    fontSize: '1.125rem', // text-lg
    fontWeight: '600', // semi-bold
  };

  const textStyle = {
    color: '#4A4A4A', // Slightly lighter gray for general text
    fontSize: '0.9375rem', // Slightly smaller font for details
  };

  const listItemStyle = {
    marginLeft: '1.5rem', // ml-4 for list indentation
    listStyleType: 'disc',
    color: '#4A4A4A',
  };

  const linkStyle = {
    color: '#0000FF', // Standard blue for links
    textDecoration: 'underline',
    marginRight: '0.5rem',
  };

  return (
    <div style={containerStyle} className="print-area"> {/* Keep print-area if used for specific print CSS */}
      {/* Header/About Section (You can add name/contact info here later) */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Your Name Here</h1> {/* text-3xl */}
        <p style={{ fontSize: '1.125rem', color: '#666666' }}>Your Email | Your Phone | Your LinkedIn | Your GitHub</p> {/* text-lg */}
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{edu.institution} - {edu.degree}</h3>
              <p style={textStyle}>{edu.years} | {edu.location}</p>
              {edu.details && <p style={{ ...textStyle, fontSize: '0.875rem' }}>{edu.details}</p>} {/* text-sm */}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Skills</h2>
          {skills.map((category, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ fontWeight: '600' }}>{category.heading}:</h3>
              <p style={textStyle}>{category.items.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{project.title}</h3>
              <ul style={listItemStyle}>
                {project.description.split('\n').map((line, i) =>
                   line.trim().length > 0 && <li key={i}>{line.trim()}</li>
                )}
              </ul>
              {project.technologies.length > 0 && (
                <p style={{ ...textStyle, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              )}
              {(project.github_link || project.live_link) && (
                <p style={{ ...textStyle, fontSize: '0.875rem' }}>
                  {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>}
                  {project.live_link && <a href={project.live_link} target="_blank" rel="noopener noreferrer" style={linkStyle}>Live Demo</a>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hackathons and Achievements */}
      {hackathonsAndAchievements.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Hackathons & Achievements</h2>
          {hackathonsAndAchievements.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{item.name}</h3>
              <p style={textStyle}>{item.details}</p>
              {item.achievement && <p style={{ ...textStyle, fontSize: '0.875rem' }}><strong>Achievement:</strong> {item.achievement}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Professional Development */}
      {professionalDevelopment.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Professional Development</h2>
          {professionalDevelopment.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{item.title} {item.company && `at ${item.company}`}</h3>
              <p style={textStyle}>{item.date} | {item.location}</p>
              <p style={textStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Licenses and Certifications */}
      {licensesAndCertifications.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Licenses & Certifications</h2>
          {licensesAndCertifications.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{item.name}</h3>
              {item.issuer && <p style={textStyle}>Issued by {item.issuer}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Extra-Curricular Activities and Hobbies */}
      {extraCurricularActivitiesAndHobbies.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Activities & Hobbies</h2>
          {extraCurricularActivitiesAndHobbies.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{item.name} {item.role && `(${item.role})`}</h3>
              <p style={textStyle}>{item.years}</p>
              <p style={textStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Interests</h2>
          <p style={textStyle}>{interests.join(', ')}</p>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Additional Sections</h2>
          {customSections.map((section, index) => (
            <div key={index} style={{ marginBottom: '0.75rem' }}>
              <h3 style={subHeadingStyle}>{section.heading}</h3>
              <p style={textStyle}>{section.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumePreview;