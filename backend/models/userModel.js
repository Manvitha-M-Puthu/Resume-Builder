import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    date:{type:Date, default:Date.now},
});

const userModel = mongoose.model('User',userSchema);

export default userModel;

