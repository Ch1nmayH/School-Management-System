import Teacher from "../models/teacherModel.js"

const addTeacher = async (req,res,next) =>{

    try {
        const name = req.body.name;
        const email = req.body.email;   
        const subject = req.body.subject;
        const alreadyExists = await Teacher.findOne({email});
        if(!alreadyExists){
            const newTeacher = await Teacher.create({name,email,subject});
            res.status(200).json({message : "New Teacher Successfully added."})
        }
        else {
            res.status(400).json({message : "Email Already Exists."})
        }
        
    }  catch (error) {
        // Check if the error is a Mongoose validation error
        if (error.name === 'ValidationError') {
            // Extract and format error messages
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors });
        }

        // For other types of errors, pass them to the next middleware
        next(error);
    }
   
}

const getAllTeachers = async (req,res,next) =>{
    const teachers = await Teacher.find({});
    if (teachers.length > 0){
        res.status(200).json(teachers);
    }
    else {
        res.status(200).json({message : "No Teacher Records Found."})
    }
}

export default {
    addTeacher,
    getAllTeachers
}