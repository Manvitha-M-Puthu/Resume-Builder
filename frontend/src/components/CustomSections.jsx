// src/components/CustomSections.jsx
import React from 'react';

function CustomSections({ customSections, onCustomSectionsChange, onAddCustomSection, onRemoveCustomSection }) {
  const handleCustomSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newCustomSections = [...customSections];
    newCustomSections[index] = { ...newCustomSections[index], [name]: value };
    onCustomSectionsChange(newCustomSections);
  };

  return (
    <section id="customSections" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Custom Sections</h2>
      <p className="text-gray-600 mb-4">Add any additional sections you need (e.g., Awards, Publications).</p>
      {customSections.map((section, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Custom Section {index + 1}</h3>
          <div className="mb-4">
            <label htmlFor={`custom-heading-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Section Heading
            </label>
            <input
              type="text"
              id={`custom-heading-${index}`}
              name="heading"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={section.heading}
              onChange={(e) => handleCustomSectionChange(index, e)}
              placeholder="e.g., Awards, Publications, Volunteer Work"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`custom-content-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              id={`custom-content-${index}`}
              name="content"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={section.content}
              onChange={(e) => handleCustomSectionChange(index, e)}
              placeholder="e.g., Recipient of the 'Innovation Challenge' award (2023)."
              required
            ></textarea>
          </div>
          {customSections.length > 0 && (
            <button
              type="button"
              onClick={() => onRemoveCustomSection(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Custom Section"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddCustomSection}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Custom Section
      </button>
    </section>
  );
}

export default CustomSections;