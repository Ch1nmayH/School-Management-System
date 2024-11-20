import { Router } from "express";
import studentController from "../controller/studentController.js";
import upload from "../middlewares/multer.js";
import studentMiddleware from "../middlewares/studentMiddleware.js"

const router = Router();

router.get("/", (req,res)=>{
    res.send("Student API");
})

router.post("/login", studentController.login)
router.post("/logout", studentController.logout)

router.post("/addStudent", studentMiddleware.checkTeacherAuth, studentController.addStudent)
router.get("/getStudent", studentMiddleware.checkTeacherAuth, studentController.getStudent)
router.put("/update", studentMiddleware.checkStudentAuth, studentController.updateStudent)
router.delete("/delete",studentMiddleware.checkTeacherAuth,  studentController.deleteStudent)

//Cloudinary Routes to upload avatar / profile picture
router.post("/uploadAvatar", studentMiddleware.checkStudentAuth, upload.single('image'), studentController.uploadAvatar)

export default router;