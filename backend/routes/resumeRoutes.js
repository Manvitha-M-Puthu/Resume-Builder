import express from 'express';
import { addResume, getResume } from '../controllers/resumeController.js';
import authUser from '../middleware/auth.js';

const resumeRoutes = express.Router();

resumeRoutes.post('/', authUser , addResume);
resumeRoutes.get('/me', authUser, getResume);

export default resumeRoutes;