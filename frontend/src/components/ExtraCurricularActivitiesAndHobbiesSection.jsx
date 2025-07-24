// src/components/ExtraCurricularActivitiesAndHobbiesSection.jsx
import React from 'react';

function ExtraCurricularActivitiesAndHobbiesSection({ extraCurricularActivitiesAndHobbies, onActivitiesChange, onAddActivity, onRemoveActivity }) {
  const handleActivityChange = (index, e) => {
    const { name, value } = e.target;
    const newActivities = [...extraCurricularActivitiesAndHobbies];
    newActivities[index] = { ...newActivities[index], [name]: value };
    onActivitiesChange(newActivities);
  };

  return (
    <section id="activities" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Extra-Curricular Activities & Hobbies</h2>
      {extraCurricularActivitiesAndHobbies.map((item, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Entry {index + 1}</h3>
          <div className="mb-4">
            <label htmlFor={`activity-name-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Activity/Hobby Name
            </label>
            <input
              type="text"
              id={`activity-name-${index}`}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.name}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`activity-role-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Your Role (Optional)
            </label>
            <input
              type="text"
              id={`activity-role-${index}`}
              name="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.role}
              onChange={(e) => handleActivityChange(index, e)}
              placeholder="e.g., President, Volunteer"
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`activity-years-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Years (e.g., 2023-25)
            </label>
            <input
              type="text"
              id={`activity-years-${index}`}
              name="years"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.years}
              onChange={(e) => handleActivityChange(index, e)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`activity-description-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id={`activity-description-${index}`}
              name="description"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.description}
              onChange={(e) => handleActivityChange(index, e)}
              required
            ></textarea>
          </div>
          {extraCurricularActivitiesAndHobbies.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveActivity(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddActivity}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Activity/Hobby
      </button>
    </section>
  );
}

export default ExtraCurricularActivitiesAndHobbiesSection;