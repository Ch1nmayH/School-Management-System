import { Router } from "express";
import teacherController from "../controller/teacherController.js";
import studentMiddleware from "../middlewares/studentMiddleware.js";
const router = Router();

router.get("/", (req,res)=>{
    res.send("Teacher API");
})

router.post("/login", teacherController.login)
router.post("/logout", teacherController.logout)

router.post("/addTeacher", studentMiddleware.checkAdminAuth, teacherController.addTeacher)
router.get("/getTeacher", teacherController.getTeacher)

export default router;