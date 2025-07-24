import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import cors from 'cors';
import aiRoutes from './routes/api/ai.js'; 

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000', 
    //reminder: Have to add your frontend URL here
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
//Routes
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);
//connection to mongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("MongoDB connected!")).catch(err => console.error("MongoDB connection error:", err));

app.get('/',(req,res)=>{
    res.send('Welcome to the Resume Builder API');
});

export default app;