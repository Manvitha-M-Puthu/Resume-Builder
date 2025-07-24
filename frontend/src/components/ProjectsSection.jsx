// src/components/ProjectsSection.jsx
import React, { useState } from 'react';

function ProjectsSection({ projects, onProjectsChange, onGenerateAISuggestion }) {
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null); // To track which project AI is for
  const [aiLoading, setAiLoading] = useState(false);

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    onProjectsChange(newProjects);
  };

  const addProject = () => {
    onProjectsChange([
      ...projects,
      { title: '', description: '', github_link: '', live_link: '', technologies: [''] },
    ]);
    setAiSuggestions(null); 
    setCurrentProjectIndex(null);
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    onProjectsChange(newProjects);
    if (currentProjectIndex === index) {
      setAiSuggestions(null); 
      setCurrentProjectIndex(null);
    } else if (currentProjectIndex > index) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handleTechnologyChange = (projectIndex, techIndex, e) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies[techIndex] = e.target.value;
    onProjectsChange(newProjects);
  };

  const addTechnology = (projectIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies.push('');
    onProjectsChange(newProjects);
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies = newProjects[projectIndex].technologies.filter((_, i) => i !== techIndex);
    onProjectsChange(newProjects);
  };

  const requestAISuggestions = async (index) => {
    setCurrentProjectIndex(index);
    setAiLoading(true);
    setAiSuggestions(null);
    const project = projects[index];

    // Prepare inputs for AI
    const promptContext = `Project Title: ${project.title}`;
    const userText = project.description;
    const keywords = project.technologies.join(', ');

    const results = await onGenerateAISuggestion(promptContext, userText, keywords, 'project');

    if (results && results.success) {
      setAiSuggestions(results.suggestions);
    } else {
      setAiSuggestions(['Failed to generate suggestions. Please try again.']);
    }
    setAiLoading(false);
  };

  const applyAISuggestion = (suggestion) => {
    if (currentProjectIndex !== null) {
      const newProjects = [...projects];
      newProjects[currentProjectIndex].description = suggestion;
      onProjectsChange(newProjects);
      setAiSuggestions(null); 
      setCurrentProjectIndex(null);
    }
  };

  return (
    <section id="projects" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Projects</h2>

      {projects.map((project, projectIndex) => (
        <div key={projectIndex} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Project {projectIndex + 1}</h3>

          <div className="mb-4">
            <label htmlFor={`project-title-${projectIndex}`} className="block text-gray-700 text-sm font-bold mb-2">
              Project Title
            </label>
            <input
              type="text"
              id={`project-title-${projectIndex}`}
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={project.title}
              onChange={(e) => handleProjectChange(projectIndex, e)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor={`project-desc-${projectIndex}`} className="block text-gray-700 text-sm font-bold mb-2">
              Project Description (Basic input for AI)
            </label>
            <textarea
              id={`project-desc-${projectIndex}`}
              name="description"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={project.description}
              onChange={(e) => handleProjectChange(projectIndex, e)}
              placeholder="e.g., Built an e-commerce site with user auth and cart."
              required
            ></textarea>
            <button
                type="button"
                onClick={() => requestAISuggestions(projectIndex)}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                disabled={aiLoading && currentProjectIndex === projectIndex}
            >
                {aiLoading && currentProjectIndex === projectIndex ? 'Generating...' : 'Generate AI Suggestions'}
            </button>
            {currentProjectIndex === projectIndex && aiSuggestions && (
                <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
                    <p className="text-sm font-semibold text-indigo-800 mb-2">AI Suggestions:</p>
                    {aiSuggestions.map((suggestion, sIndex) => (
                        <div key={sIndex} className="flex items-center mb-2 last:mb-0">
                            <span className="text-gray-800 text-sm flex-1 mr-2">{suggestion}</span>
                            <button
                                type="button"
                                onClick={() => applyAISuggestion(suggestion)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded text-xs"
                            >
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Technologies Used (for AI context)
            </label>
            {project.technologies.map((tech, techIndex) => (
              <div key={techIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  value={tech}
                  onChange={(e) => handleTechnologyChange(projectIndex, techIndex, e)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
                {project.technologies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechnology(projectIndex, techIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs flex-shrink-0"
                    title="Remove Technology"
                  >
                    &#x2715;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addTechnology(projectIndex)}
              className="mt-2 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Add Technology
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`github-link-${projectIndex}`} className="block text-gray-700 text-sm font-bold mb-2">
                GitHub Link
              </label>
              <input
                type="url"
                id={`github-link-${projectIndex}`}
                name="github_link"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={project.github_link}
                onChange={(e) => handleProjectChange(projectIndex, e)}
                placeholder="https://github.com/user/repo"
              />
            </div>
            <div>
              <label htmlFor={`live-link-${projectIndex}`} className="block text-gray-700 text-sm font-bold mb-2">
                Live Link
              </label>
              <input
                type="url"
                id={`live-link-${projectIndex}`}
                name="live_link"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={project.live_link}
                onChange={(e) => handleProjectChange(projectIndex, e)}
                placeholder="https://yourproject.com"
              />
            </div>
          </div>

          {projects.length > 0 && ( 
            <button
              type="button"
              onClick={() => removeProject(projectIndex)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Project Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addProject}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Project
      </button>
    </section>
  );
}

export default ProjectsSection;