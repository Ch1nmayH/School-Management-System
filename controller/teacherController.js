import Teacher from "../models/teacherModel.js"
import jwt from "jsonwebtoken"

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

const getTeacher = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, classId, _id } = req.query;
      let query = {};
      if (classId) {
        query.classId = classId;
      } else if (_id) {
        query._id = _id;
      }
      const teachers = await Teacher.find(query)
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();
  
      const totalCount = await Teacher.countDocuments(query);
  
      res.status(200).json({
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        teachers,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const login = async (req, res, next) => {
    try {
      const Existingtoken = req.cookies.token;
      if (Existingtoken) {
        const decodedData = jwt.verify(Existingtoken, process.env.JWT_SECRET);
        if (decodedData) {
          return res.status(200).json({ message: "You are already Logged in" });
        }
      }
      const _id = req.body._id;
      const teacher = await Teacher.findById(_id);
      if (!teacher) {
        return res.status(400).json({ message: "Teacher ID not found" });
      }
  
      const token = jwt.sign(
        { email: teacher.email, _id: teacher._id },
        process.env.JWT_SECRET
      );
  
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
        })
        .json({ user: teacher, token });
    } catch (error) {
      res.status(400).json({ message: `${error.message}` });
    }
  };
  
  const logout = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(200).json({ message: "You are not logged in." });
      }
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedData) {
        return res.status(200).json({ message: "User not authenticated" });
      }
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
      res.status(400).json({ message: `${error.message}` });
    }
  };

export default {
    addTeacher,
    getTeacher,
    login,
    logout
}