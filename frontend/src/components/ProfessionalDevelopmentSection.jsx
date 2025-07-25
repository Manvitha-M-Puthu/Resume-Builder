// src/components/ProfessionalDevelopmentSection.jsx
import React from 'react';

function ProfessionalDevelopmentSection({ professionalDevelopment, onProfessionalDevelopmentChange, onAddProfessionalDevelopment, onRemoveProfessionalDevelopment }) {
  const handleDevelopmentChange = (index, e) => {
    const { name, value } = e.target;
    const newDevelopment = [...professionalDevelopment];
    newDevelopment[index] = { ...newDevelopment[index], [name]: value };
    onProfessionalDevelopmentChange(newDevelopment);
  };

  return (
    <section id="professionalDev" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Professional Development</h2>
      {professionalDevelopment.map((item, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Entry {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`dev-title-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id={`dev-title-${index}`}
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={item.title}
                onChange={(e) => handleDevelopmentChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`dev-company-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                id={`dev-company-${index}`}
                name="company"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={item.company}
                onChange={(e) => handleDevelopmentChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`dev-location-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id={`dev-location-${index}`}
                name="location"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={item.location}
                onChange={(e) => handleDevelopmentChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`dev-date-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                Date (e.g., Jan-2024)
              </label>
              <input
                type="text"
                id={`dev-date-${index}`}
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={item.date}
                onChange={(e) => handleDevelopmentChange(index, e)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor={`dev-description-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id={`dev-description-${index}`}
              name="description"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.description}
              onChange={(e) => handleDevelopmentChange(index, e)}
              required
            ></textarea>
          </div>
          {professionalDevelopment.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveProfessionalDevelopment(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default ProfessionalDevelopmentSection;