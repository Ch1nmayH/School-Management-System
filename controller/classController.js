import Teacher from "../models/teacherModel.js";
import Class from "../models/ClassModel.js";
import Student from "../models/studentModel.js"

const addClass = async (req, res, next) => {
  try {
    const { name, teacherId } = req.body;
    const alreadyExists = await Class.findOne({ name });
    if (!alreadyExists) {
      if (!teacherId) {
        teacherId = "673c7271b042ed6a6c0e0cbe"; //this is a dummy data  while creating the teacherId if not already provided
      }
      const newClass = await Class.create({ name, teacherId });
      res
        .status(200)
        .json({ message: "New Class with dummy teacher Successfully added." });
    } else {
      res.status(400).json({ message: "Class Already Exists." });
    }
  } catch (error) {
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract and format error messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation Error", errors });
    }

    // For other types of errors, pass them to the next middleware
    next(error);
  }
};

const assignTeacher = async (req, res) => {
  const { classId, teacherId } = req.body;
  if (!classId) {
    res.status(200).json({ message: "Please Enter the classId." });
  } else if (!teacherId) {
    res
      .status(200)
      .json({
        message: "Please Enter the teacherId you want to assign to this class.",
      });
  }

  const classExists = await Class.findOne({ _id: classId });
  if (!classExists) {
    res.status(200).json({ message: "Invalid Class." });
  }

  const teacherExists = await Teacher.findOne({ _id: teacherId });
  if (!teacherExists) {
    res.status(200).json({ message: "Invalid Teacher." });
  }

  const updateClass = await Class.findOneAndUpdate(
    { _id: classId },
    {
      teacherId,
    }
  );

  res
    .status(200)
    .json({ message: "Successfully Updated the teacher for this class." });
};

const getClass = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, teacherId, _id } = req.query;
    let query = {};
    if (teacherId) {
      query.teacherId = teacherId;
    } else if (_id) {
      query._id = _id;
    }
    const classes = await Class.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const totalCount = await Class.countDocuments(query);

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      classes,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateClass = async (req,res)=>{
    try {
        const { _id, ...updates } = req.body;
        if (!_id) {
          return res.status(400).json({ message: "Class ID (_id) is required" });
        }
    
        const classExists = await Class.findById(_id);
        if (!classExists) {
          return res.status(400).json({ message: "Class Not Found." });
        }
        const classUpdated = await Class.findByIdAndUpdate(
          _id,
    
          { $set: updates },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          message: "Class successfully updated",
          class: classUpdated,
        });
      } catch (error) {
        res.status(400).json({ message: `${error.message}` });
      }
}

const deleteClass = async (req,res)=>{
    try {
        const _id = req.body._id;
        const deleteClass = await Class.findOneAndDelete(_id);
        const deleteStudentsFromThatClass = await Student.findByIdAndDelete({classId:_id});
        res.status(200).json({ message: "Class Has been Successfully Deleted." });
      } catch (error) {
        res.status(400).json({ message: `${error.message}` });
      }
}
export default {
  addClass,
  getClass,
  assignTeacher,
  updateClass,
  deleteClass
};
