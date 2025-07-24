
import React from 'react';

function EducationSection({ education, onEducationChange, onAddEducation, onRemoveEducation }) {
  return (
    <section id="education" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Entry {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`institution-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Institution
              </label>
              <input
                type="text"
                id={`institution-${index}`}
                name="institution"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={edu.institution}
                onChange={(e) => onEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`degree-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Degree
              </label>
              <input
                type="text"
                id={`degree-${index}`}
                name="degree"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={edu.degree}
                onChange={(e) => onEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`years-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Years (e.g., 2022-26)
              </label>
              <input
                type="text"
                id={`years-${index}`}
                name="years"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={edu.years}
                onChange={(e) => onEducationChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`location-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id={`location-${index}`}
                name="location"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={edu.location}
                onChange={(e) => onEducationChange(index, e)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor={`details-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Details (e.g., CGPA, relevant coursework)
            </label>
            <textarea
              id={`details-${index}`}
              name="details"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={edu.details}
              onChange={(e) => onEducationChange(index, e)}
            ></textarea>
          </div>
          {education.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveEducation(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Education Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddEducation}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Education
      </button>
    </section>
  );
}

export default EducationSection;