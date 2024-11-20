import { Router } from "express";
import studentController from "../controller/studentController.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Student API");
})


router.post("/login", studentController.login)
router.post("/logout", studentController.logout)

router.post("/addStudent", studentController.addStudent)
router.get("/getStudent", studentController.getStudent)
router.put("/update", studentController.updateStudent)
router.delete("/delete", studentController.deleteStudent)

//Cloudinary Routes to upload avatar / profile picture
router.post("/uploadAvatar", upload.single('image'), studentController.uploadAvatar)

export default router;