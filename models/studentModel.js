import mongoose, { mongo } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const studentSchema = new mongoose.Schema({

    name : {type : String, required: [true, "Please Enter a name."]},
    email : {
        type : String,
        required : [true, "Please Enter an email."],
        unique : [true, "Email Already Taken, Please Enter a Unique Email."],
        validate : [isEmail, "Please Enter a Valid Email."]
    },
    classId : {type : mongoose.Schema.Types.ObjectId, ref: 'Class', required: [true, "Class ID is Missing, Please Enter a Class Reference ID to Proceed."]},
    profileImageUrl : {type : String, default : `${process.env.DEFAULT_AVATAR_URL}`},
    createdAt : {type : Date, default: Date.now}

});

export default mongoose.model('Student', studentSchema);