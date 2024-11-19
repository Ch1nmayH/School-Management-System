import { Router } from "express";
import studentController from "../controller/studentController.js";
const router = Router();

router.get("/", (req,res)=>{
    res.send("Student API");
})

router.post("/addStudent", studentController.addStudent)
router.get("/getall", studentController.getAllStudents)

export default router;