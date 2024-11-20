import { Router } from "express";
import teacherController from "../controller/teacherController.js";
import studentMiddleware from "../middlewares/studentMiddleware.js";
import upload from "../middlewares/multer.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("Teacher API");
});

router.post("/login", teacherController.login);
router.post("/logout", teacherController.logout);

router.post(
  "/addTeacher",
  studentMiddleware.checkAdminAuth,
  teacherController.addTeacher
);
router.get(
  "/getTeacher",
  studentMiddleware.checkAdminAuth,
  teacherController.getTeacher
);
router.put(
  "/update",
  studentMiddleware.checkTeacherAuth,
  teacherController.updateTeacher
);
router.delete(
  "/delete",
  studentMiddleware.checkAdminAuth,
  teacherController.deleteTeacher
);

//Cloudinary Routes to upload avatar / profile picture
router.post(
  "/uploadAvatar",
  studentMiddleware.checkTeacherAuth,
  upload.single("image"),
  teacherController.uploadAvatar
);

export default router;
