import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addAdmin = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin, profileImageUrl } = req.body;

    const alreadyExists = await Admin.findOne({ email });
    if (!alreadyExists) {
      const newAdmin = await Admin.create({
        name,
        email,
        password,
        isAdmin,
        profileImageUrl,
      });
      res.status(200).json({ message: "New Admin Successfully added." });
    } else {
      res.status(400).json({ message: "Email Already Exists." });
    }
  } catch (error) {
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract and format error messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation Error", errors });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const Existingtoken = req.cookies.token;
    if (Existingtoken) {
      try {
        const decodedData = jwt.verify(Existingtoken, process.env.JWT_SECRET);
        if (decodedData) {
          return res.status(200).json({ message: "You are already Logged in" });
        }
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
    const { email, password } = req.body;
    if (!email) {
      return res.status(200).json({ message: "Please enter the email ID" });
    }
    if (!password) {
      return res.status(200).json({ message: "Please enter the password" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(200).json({ message: "Invalid email ID" });
    }

    const decryptPass = await bcrypt.compare(password, admin.password);
    if (!decryptPass) {
      return res.status(200).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: admin.email, _id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({ user: admin, token });
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
  addAdmin,
  login,
  logout,
};
