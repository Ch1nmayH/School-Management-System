import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    name: {type : String, require: [true, "Please Enter the Class/Grade Name."]},
    teacherId : {type : mongoose.Schema.Types.ObjectId, ref:'Teacher', require : [true, "Invalid Teacher ID."]},
    studentCount  : {type : Number, default : 0},
    createdAt: {type:Date, default:Date.now}
})

export default mongoose.model("Class", classSchema);