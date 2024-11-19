import { Router } from "express";
import teacherController from "../controller/teacherController.js";
const router = Router();

router.get("/", (req,res)=>{
    res.send("Teacher API");
})

router.post("/addTeacher", teacherController.addTeacher)
router.get("/getall", teacherController.getAllTeachers)

export default router;