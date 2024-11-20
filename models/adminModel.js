import mongoose, { mongo } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from "bcrypt"

const adminSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please Enter a name."] },
  email: {
    type: String,
    required: [true, "Please Enter an email."],
    unique: [true, "Email Already Taken, Please Enter a Unique Email."],
    validate: [isEmail, "Please Enter a Valid Email."],
  },
  password : {type: String, 
    required : [true, "Please Enter a password to continue."],
    minlength: 6,
  },
  isAdmin : {type : Boolean, default:true},
  profileImageUrl: {
    type: String,
    default: `${process.env.DEFAULT_AVATAR_URL}`,
  },
  createdAt: { type: Date, default: Date.now },
});


adminSchema.pre("save", async function (next) {
  try {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (error) {
    console.log(error);
    throw Error("Unable to create the user");
    next();
  }
});

export default mongoose.model("Admin", adminSchema);

