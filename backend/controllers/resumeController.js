
import Resume from '../models/resumeModel.js';

export const addResume  = async (req, res) => {
    const userId = req.user;
    const {
        education,
        skills, 
        projects,
        hackathonsAndAchievements,
        professionalDevelopment,
        licensesAndCertifications,
        extraCurricularActivitiesAndHobbies,
        interests,
        customSections 
    } = req.body;

    const resumeFields = {};
    resumeFields.user = userId; 

    if (education) resumeFields.education = education;
    if (skills) resumeFields.skills = skills; 
    if (projects) resumeFields.projects = projects;
    if (hackathonsAndAchievements) resumeFields.hackathonsAndAchievements = hackathonsAndAchievements;
    if (professionalDevelopment) resumeFields.professionalDevelopment = professionalDevelopment;
    if (licensesAndCertifications) resumeFields.licensesAndCertifications = licensesAndCertifications;
    if (extraCurricularActivitiesAndHobbies) resumeFields.extraCurricularActivitiesAndHobbies = extraCurricularActivitiesAndHobbies;
    if (interests) resumeFields.interests = interests;
    if (customSections) resumeFields.customSections = customSections; 

    try {
        let resume = await Resume.findOne({ user: userId });

        if (resume) {
            resume = await Resume.findOneAndUpdate(
                { user: userId },
                { $set: resumeFields, lastUpdated: Date.now() },
                { new: true, upsert: true }
            );
            return res.json({ success: true, message: "Resume updated successfully", resume });
        }

        resume = new Resume(resumeFields);
        await resume.save();
        res.json({ success: true, message: "Resume created successfully", resume });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error saving resume data.' });
    }
};

export const getResume = async (req, res) => {
    const userId = req.user;
    try {
        const resume = await Resume.findOne({ user: userId }).populate('user', ['email']);

        if (!resume) {
            return res.status(404).json({ success:false, message: 'No resume found for this user' });
        }

        res.json({ success: true, message: "Resume retrieved successfully", resume });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};