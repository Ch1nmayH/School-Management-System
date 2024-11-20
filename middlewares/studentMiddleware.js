import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null; 
    }
};

const checkStudentAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not logged in." });
    }

    const decodedData = verifyToken(token);
    if (!decodedData) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    try {
        const studentExists = await Student.findById(decodedData._id);
        if (!studentExists) {
            return res.status(403).json({ message: "Unauthorized user." });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error while verifying user." });
    }
};

const checkTeacherAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not logged in." });
    }

    const decodedData = verifyToken(token);
    if (!decodedData) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    try {
        const teacherExists = await Teacher.findById(decodedData._id);
        if (!teacherExists) {
            const adminExists = await Admin.findById(decodedData._id);
            if (!adminExists || !adminExists.isAdmin) {
                return res.status(403).json({ message: "Unauthorized user." });
            }
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error while verifying user." });
    }
};

const checkAdminAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not logged in." });
    }

    const decodedData = verifyToken(token);
    if (!decodedData) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    try {
        const adminExists = await Admin.findById(decodedData._id);
        if (!adminExists || !adminExists.isAdmin) {
            return res.status(403).json({ message: "Unauthorized user." });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error while verifying user." });
    }
};

export default {
    checkStudentAuth,
    checkTeacherAuth,
    checkAdminAuth,
};
