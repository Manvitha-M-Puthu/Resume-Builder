import React from 'react';

function SkillsSection({ skills, onSkillsChange }) {

  const handleSkillCategoryHeadingChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index].heading = e.target.value;
    onSkillsChange(newSkills);
  };

  const handleSkillItemChange = (categoryIndex, itemIndex, e) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items[itemIndex] = e.target.value;
    onSkillsChange(newSkills); 
  };

  const addSkillItem = (categoryIndex) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items.push(''); 
    onSkillsChange(newSkills);
  };

  const removeSkillItem = (categoryIndex, itemIndex) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, i) => i !== itemIndex);
    onSkillsChange(newSkills);
  };

  const addSkillCategory = () => {
    const newSkills = [...skills, { heading: '', items: [''] }]; 
    onSkillsChange(newSkills);
  };

  const removeSkillCategory = (categoryIndex) => {
    const newSkills = skills.filter((_, i) => i !== categoryIndex);
    onSkillsChange(newSkills);
  };

  return (
    <section id="skills" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills</h2>

      {skills.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          {/* Skill Category Heading Input */}
          <div className="mb-4">
            <label htmlFor={`skill-heading-${categoryIndex}`} className="block text-gray-700 text-sm font-bold mb-2">
              Skill Category Heading
            </label>
            <input
              type="text"
              id={`skill-heading-${categoryIndex}`}
              name="heading"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Programming Languages, Soft Skills"
              value={category.heading}
              onChange={(e) => handleSkillCategoryHeadingChange(categoryIndex, e)}
              required
            />
          </div>

          {/* Individual Skill Items */}
          <h3 className="text-lg font-medium text-gray-800 mb-3">Skills in this Category</h3>
          {category.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center mb-3">
              <input
                type="text"
                id={`skill-item-${categoryIndex}-${itemIndex}`}
                name="item"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                placeholder="e.g., JavaScript, React, Teamwork"
                value={item}
                onChange={(e) => handleSkillItemChange(categoryIndex, itemIndex, e)}
                required
              />
              {category.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs flex-shrink-0"
                  title="Remove Skill"
                >
                  &#x2715;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addSkillItem(categoryIndex)}
            className="mt-2 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
          >
            Add Skill to this Category
          </button>

          {skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkillCategory(categoryIndex)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Skill Category"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSkillCategory}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add New Skill Category
      </button>
    </section>
  );
}

export default SkillsSection;