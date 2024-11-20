import Student from "../models/studentModel.js";
import Class from "../models/ClassModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinaryConfig.js";

const addStudent = async (req, res, next) => {
  const { name, email, grade } = req.body;
  let classId = undefined;
  const alreadyExists = await Student.findOne({ email });
  if (!alreadyExists) {
    const checkGrade = await Class.findOne({ name: grade });
    if (checkGrade) {
      classId = checkGrade._id;
      const newStudent = await Student.create({ name, email, classId });
      if (newStudent) {
        updateStudentCount(classId);
        res
          .status(200)
          .json({ message: "New Student Successfully added to the class." });
      }
    } else {
      res.status(400).json({ message: "Invalid Grade Name Provided" });
    }
  } else {
    res.status(400).json({ message: "Email Already Exists." });
  }
};

const updateStudentCount = async (classId) => {
  try {
    let count = await Student.countDocuments({ classId });
    const updateClassStudentCount = await Class.findByIdAndUpdate(classId, {
      studentCount: count,
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
    return -1;
  }
};

const getStudent = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, classId, _id } = req.query;
    let query = {};
    if (classId) {
      query.classId = classId;
    } else if (_id) {
      query._id = _id;
    }
    const students = await Student.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const totalCount = await Student.countDocuments(query);

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      students,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { _id, ...updates } = req.body;
    const token = req.cookies.token;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData) {
      const stu = await Student.findById(_id);
      if (stu) {
        if (stu._id != decodedData._id) {
          res.status(400).json({ message: `You are not authorized.` });
        }
      }
    }
    if (!_id) {
      return res.status(400).json({ message: "Student ID (_id) is required" });
    }

    const studentExist = await Student.findById(_id);
    if (!studentExist) {
      return res.status(400).json({ message: "Student Not Found." });
    }

    const studentUpaded = await Student.findByIdAndUpdate(
      _id,

      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Student successfully updated",
      student: studentUpaded,
    });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const studnet = await Student.findOneAndDelete(_id);
    res.status(200).json({ message: "Student Has been Successfully Deleted." });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
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
    const student = await Student.findById(_id);
    if (!student) {
      return res.status(400).json({ message: "Student ID not found" });
    }

    const token = jwt.sign(
      { email: student.email, _id: student._id },
      process.env.JWT_SECRET
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({ user: student, token });
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

const uploadAvatar = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const token = req.cookies.token;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData) {
      const stu = await Student.findById(userId);
      if (stu) {
        if (stu._id != decodedData._id) {
          res.status(400).json({ message: `You are not authorized.` });
        }
      }
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `student_management_system/avatars/${userId}`,
      overwrite: true,
    });

    const updateAvatar = await Student.findByIdAndUpdate(userId, {
      profileImageUrl : result.secure_url
    })
    res.status(200).json({
      message: "Profile Picture has been successfully uploaded.",
      url: result.secure_url, // Cloudinary's URL for the image
    });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

export default {
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  uploadAvatar,
  login,
  logout,
};
