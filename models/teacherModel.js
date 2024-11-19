import mongoose, { mongo } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const teacherSchema = new mongoose.Schema({

    name : {type : String, required: [true, "Please Enter a name."]},
    email : {
        type : String,
        required : [true, "Please Enter an email."],
        unique : [true, "Email Already Taken, Please Enter a Unique Email."],
        validate : [isEmail, "Please Enter a Valid Email."]
    },
    subject :  {type : String, required : [true, "Please Enter the Subject."]},
    profileImageUrl : {type : String, default : "./uploads/defaultAvatar.jpg"},
    createdAt : {type : Date, default: Date.now}

});

export default mongoose.model('Teacher', teacherSchema);