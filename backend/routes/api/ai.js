
import express from 'express';
import { generateAIText } from '../../controllers/aiController.js';
import auth from '../../middleware/auth.js'; 

const airoutes = express.Router();

airoutes.post('/generate-text', auth, generateAIText);

export default airoutes;
