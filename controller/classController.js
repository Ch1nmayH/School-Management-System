import Teacher from "../models/teacherModel.js"
import Class from "../models/ClassModel.js";

const addClass = async (req,res,next) =>{

    try {
        const name = req.body.name;
        const teacherId = req.body.teacherId;
        // const dummyTeacherId = 98287837928324;
        const alreadyExists = await Class.findOne({name});
        if(!alreadyExists){
            const newClass = await Class.create({name,teacherId});
            res.status(200).json({message : "New Class with dummy teacher Successfully added."})
        }
        else {
            res.status(400).json({message : "Class Already Exists."})
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

const getAllClass = async (req,res,next) =>{
    const classes = await Class.find({});
    if (classes.length > 0){
        res.status(200).json(classes);
    }
    else {
        res.status(200).json({message : "No Class Records Found."})
    }
}

export default {
    addClass,
    getAllClass
}