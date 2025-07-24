import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);

//connection to mongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("MongoDB connected!")).catch(err => console.error("MongoDB connection error:", err));

app.get('/',(req,res)=>{
    res.send('Welcome to the Resume Builder API');
});

export default app;