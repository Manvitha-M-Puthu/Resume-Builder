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

  return (
    <div style={{
      fontFamily: 'Times, "Times New Roman", serif',
      fontSize: '11px',
      lineHeight: '1.2',
      color: '#000',
      padding: '0.5in',
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    }}>
      
      {/* Header Section */}
      <header style={{
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '0 0 5px 0',
          color: '#000',
          letterSpacing: '0.5px',
        }}>
          Your Name Here
        </h1>
        <div style={{
          fontSize: '11px',
          color: '#000',
          lineHeight: '1.3',
        }}>
          your.email@example.com | Your LinkedIn | Your GitHub
        </div>
      </header>

      {/* Education Section */}
      {education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
            borderBottom: 'none',
          }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '2px',
                lineHeight: '1.2',
              }}>
                {edu.degree}, {edu.institution} <span style={{ float: 'right' }}>{edu.years}</span>
              </div>
              <div style={{
                fontSize: '11px',
                color: '#000',
                clear: 'both',
                marginBottom: '4px',
              }}>
                {edu.details} {edu.location}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Skills
          </h2>
          {skills.map((category, index) => (
            <div key={index} style={{
              fontSize: '11px',
              marginBottom: '4px',
              lineHeight: '1.3',
            }}>
              <strong>{category.heading} :</strong> {category.items.filter(item => item.trim()).join(', ')}.
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                margin: '0 0 3px 0',
                color: '#000',
              }}>
                {project.title}
              </h3>
              <div style={{
                fontSize: '11px',
                marginBottom: '3px',
                lineHeight: '1.3',
              }}>
                {project.description.split('\n').map((line, i) => (
                  line.trim() && <div key={i} style={{ marginBottom: '2px' }}>{line.trim()}</div>
                ))}
              </div>
              {project.technologies.filter(tech => tech.trim()).length > 0 && (
                <div style={{
                  fontSize: '10px',
                  marginBottom: '2px',
                  color: '#333',
                }}>
                  <strong>Technologies:</strong> {project.technologies.filter(tech => tech.trim()).join(', ')}
                </div>
              )}
              {(project.github_link || project.live_link) && (
                <div style={{
                  fontSize: '10px',
                  color: '#0066cc',
                }}>
                  {project.github_link && (
                    <span style={{ marginRight: '10px' }}>GitHub: {project.github_link}</span>
                  )}
                  {project.live_link && (
                    <span>Live: {project.live_link}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Hackathons and Achievements */}
      {hackathonsAndAchievements.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Hackathons and Achievements
          </h2>
          {hackathonsAndAchievements.map((item, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                margin: '0 0 2px 0',
                color: '#000',
              }}>
                {item.name}
              </h3>
              <div style={{
                fontSize: '11px',
                lineHeight: '1.3',
                marginBottom: '2px',
              }}>
                {item.details}
              </div>
              {item.achievement && (
                <div style={{
                  fontSize: '11px',
                  color: '#000',
                }}>
                  {item.achievement}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Professional Development */}
      {professionalDevelopment.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Professional Development
          </h2>
          {professionalDevelopment.map((item, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '2px',
              }}>
                {item.title} {item.company && `- ${item.company}`}, {item.location} <span style={{ float: 'right' }}>{item.date}</span>
              </div>
              {item.description && (
                <div style={{
                  fontSize: '11px',
                  lineHeight: '1.3',
                  clear: 'both',
                }}>
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Licenses and Certifications */}
      {licensesAndCertifications.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Licences and Certifications
          </h2>
          {licensesAndCertifications.map((item, index) => (
            <div key={index} style={{
              fontSize: '11px',
              marginBottom: '3px',
              lineHeight: '1.3',
            }}>
              {item.name} {item.issuer && `– ${item.issuer}`}
            </div>
          ))}
        </section>
      )}

      {/* Extra-Curricular Activities and Hobbies */}
      {extraCurricularActivitiesAndHobbies.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Extra - Curricular Activities and Hobbies
          </h2>
          {extraCurricularActivitiesAndHobbies.map((item, index) => (
            <div key={index} style={{ marginBottom: '6px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '2px',
              }}>
                {item.name}{item.role && `, ${item.role}`} <span style={{ float: 'right' }}>{item.years}</span>
              </div>
              {item.description && (
                <div style={{
                  fontSize: '11px',
                  lineHeight: '1.3',
                  clear: 'both',
                }}>
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {interests.length > 0 && interests.some(interest => interest.trim()) && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            Interests
          </h2>
          <div style={{
            fontSize: '11px',
            lineHeight: '1.3',
          }}>
            {interests.filter(interest => interest.trim()).join(', ')}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map((section, index) => (
        <section key={index} style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000',
          }}>
            {section.heading}
          </h2>
          <div style={{
            fontSize: '11px',
            lineHeight: '1.3',
          }}>
            {section.content}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ResumePreview;