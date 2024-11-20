import Student from "../models/studentModel.js";
import Class from "../models/ClassModel.js";


const addStudent = async (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;   
    const grade = req.body.grade;
    let classId = undefined;
    const alreadyExists = await Student.findOne({email});
    if(!alreadyExists){
        
        const checkGrade = await Class.findOne({name : grade});
        if(checkGrade){
            classId = checkGrade._id;
            const newStudent = await Student.create({name,email,classId});
            let getSudentCount = await Class.findOne({_id: classId});
            getSudentCount = getSudentCount.studentCount + 1;
            if(newStudent){
                const updateClassCount = await Class.findByIdAndUpdate({_id:classId}, {
                    studentCount: getSudentCount,
                })
            }
            res.status(200).json({message : "New Student Successfully added to the class."})
        }
        else {
            res.status(400).json({message : "Invalid Grade Name Provided"});
        }
    }
    else {
        res.status(400).json({message : "Email Already Exists."})
    }
}

const getAllStudents = async (req,res,next) =>{
    const students = await Student.find({});
    if (students.length > 0){
        res.status(200).json(students);
    }
    else {
        res.status(200).json({message : "No Student Records Found."})
    }
}

export default {
    getAllStudents,
    addStudent
}