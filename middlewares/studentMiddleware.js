import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const checkStudentAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ message: "You are not logged in." });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    return res.status(200).json({ message: "Invalid Token." });
  }

  const studentExists = await Student.findById(decodedData._id);
  if (!studentExists) {
    const teacherExsits = await Teacher.findById(decodedData._id);
    if (!teacherExsits) {
      const adminExists = await Admin.findById(decodedData._id);
      if (adminExists) {
        if (!adminExists.isAdmin) {
          return res.status(200).json({ message: "Unauthorised User." });
        }
        next();
      } else if (!adminExists) {
        return res.status(200).json({ message: "Unauthorised User." });
      }
    }
  }

  next();
};

const checkTeacherAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ message: "You are not logged in." });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    return res.status(200).json({ message: "Invalid Token." });
  }

  const teacherExsits = await Teacher.findById(decodedData._id);
  if (!teacherExsits) {
    const adminExists = await Admin.findById(decodedData._id);
    if (adminExists) {
      if (!adminExists.isAdmin) {
        return res.status(200).json({ message: "Unauthorised User." });
      }
      next();
    } else if (!adminExists) {
      return res.status(200).json({ message: "Unauthorised User." });
    }
  }

  next();
};

const checkAdminAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ message: "You are not logged in." });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    return res.status(200).json({ message: "Invalid Token." });
  }

  const adminExists = await Admin.findById(decodedData._id);
  if (adminExists) {
    if (!adminExists.isAdmin) {
      return res.status(200).json({ message: "Unauthorised User." });
    }
    next();
  } else if (!adminExists) {
    return res.status(200).json({ message: "Unauthorised User." });
  }
  next();
};

export default {
  checkStudentAuth,
  checkTeacherAuth,
  checkAdminAuth,
};
