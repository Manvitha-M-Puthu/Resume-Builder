// backend/controllers/aiController.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const generateAIText = async (req, res) => {
  const { promptContext, userText, keywords, sectionType } = req.body;

  if (!userText && !promptContext) {
    return res.status(400).json({ success: false, message: 'Please provide some text or context for AI generation.' });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  let prompt = `You are an AI assistant specialized in writing professional, ATS-friendly (Applicant Tracking System) resume content.
  Your task is to generate 3 distinct, concise, and action-oriented suggestions based on the provided user input.
  Each suggestion should be a bullet point or a short paragraph.
  Prioritize quantifiable achievements and strong action verbs.
  Present the suggestions as a numbered list (1., 2., 3.).

  General Context/Title: "${promptContext || 'Resume Section Content'}".`;

  if (sectionType === 'project') {
    prompt += `
    This is for a PROJECT description on a resume.
    User's basic project overview: "${userText}".
    Key Technologies/Skills used in this project: "${keywords || 'None provided'}".
    
    Generate 3 distinct bullet points for this project description. Each bullet point MUST INTEGRATE ALL RELEVANT TECHNOLOGIES/SKILLS and highlight project impact and measurable results.
    Example Style: "1. Engineered a dynamic e-commerce platform using React, Node.js, and MongoDB, resulting in a 25% increase in online sales by optimizing checkout processes."
    `;
  } else if (sectionType === 'experience') { 
    prompt += `
    This is for a PROFESSIONAL EXPERIENCE or JOB RESPONSIBILITY description on a resume.
    User's basic role/task description: "${userText}".
    Relevant Skills/Tools: "${keywords || 'None provided'}".
    
    Generate 3 distinct bullet points or a short paragraph for this experience. Each suggestion should INTEGRATE PROVIDED SKILLS/TOOLS and focus on responsibilities, quantifiable impact, and key achievements.
    Example Style: "1. Led a cross-functional team to develop scalable backend APIs using Express.js, enhancing system performance by 15%."
    `;
  } else if (sectionType === 'custom') { 
    prompt += `
    This is for a CUSTOM SECTION or general resume content.
    User's basic idea/content: "${userText}".
    Keywords/Additional Context: "${keywords || 'None provided'}".
    
    Generate 3 distinct options for this section. Each option should be compelling and professional, INTEGRATING ALL RELEVANT KEYWORDS/CONTEXT.
    Example Style: "1. Awarded 'Employee of the Year' for consistently exceeding sales targets by 20% and implementing a new client relationship management system."
    `;
  } else { 
    prompt += `
    This is for general resume content.
    User's basic text: "${userText}".
    Keywords/Additional Context: "${keywords || 'None provided'}".
    
    Generate 3 distinct options for enhancing this text for a resume. Each option should be compelling and professional, INTEGRATING ALL RELEVANT KEYWORDS/CONTEXT.
    `;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    
    const suggestions = text.split('\n')
                            .map(s => s.trim())
                            .filter(s => s.match(/^\d+\.\s/)) 
                            .map(s => s.replace(/^\d+\.\s/, '')) 
                            .slice(0, 3); 
   
    if (suggestions.length === 0 && text.length > 0) {
        
        suggestions.push(text.trim());
    } else if (suggestions.length === 0) { 
         suggestions.push("No specific suggestions generated. Try refining your input or generating again.");
    }


    res.json({ success: true, suggestions });

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate AI suggestions with Gemini. Please try again.' });
  }
};