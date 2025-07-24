import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const registerUser = async (req, res) => {

    const {email, password, name } = req.body;

    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.json({success:false, message: "User already exists"});
        }

        if(!validator.isEmail(email)) {
            return res.json({success:false, message: "Invalid email format"});
        }

        if(password.length < 8) {
            return res.json({success:false, message: "Password must be at least 8 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({email,name,password:hashedPassword});
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.json({success:true, user: {id: user._id, email: user.email, name: user.name}, token});
    }catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const loginUser = async (req,res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user) {
        return res.json({success:false, message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({success:false, message: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.json({success: true, user: {id: user._id, email: user.email, name: user.name}, token, message: "Login successful"});
}


