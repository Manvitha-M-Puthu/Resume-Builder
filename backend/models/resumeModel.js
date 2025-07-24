import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        years: { type: String },
        details: { type: String },
        location: { type: String }
    }],
    skills: [{ 
        heading: { type: String, required: true }, 
        items: [{ type: String }] 
    }],
    projects: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        github_link: { type: String },
        live_link: { type: String },
        technologies: [{ type: String }]
    }],
    hackathonsAndAchievements: [{
        name: { type: String, required: true },
        details: { type: String, required: true },
        achievement: { type: String }
    }],
    hackathonsAndAchievements: [{
        name: { type: String, required: true },
        details: { type: String, required: true },
        achievement: { type: String }
    }],
    licensesAndCertifications: [{
        name: { type: String, required: true },
        issuer: { type: String }
    }],
    extraCurricularActivitiesAndHobbies: [{
        name: { type: String, required: true },
        role: { type: String },
        years: { type: String },
        description: { type: String, required: true }
    }],
    interests: [{ type: String }],
    customSections: [{ 
        heading: { type: String, required: true }, 
        content: { type: String, required: true } 
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const resumeModel = mongoose.model('Resume', resumeSchema);

export default resumeModel;