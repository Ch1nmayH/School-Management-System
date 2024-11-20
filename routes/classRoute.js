import { Router } from "express";
import classController from "../controller/classController.js";
import studendMiddleware from "../middlewares/studentMiddleware.js"

const router = Router();

router.get("/", (req,res)=>{
    res.send("Class API");
})

router.post("/addClass", classController.addClass)
router.put("/assignTeacher", studendMiddleware.checkAdminAuth, classController.assignTeacher)
router.get("/getClass", studendMiddleware.checkAdminAuth, classController.getClass)
router.put("/update", studendMiddleware.checkAdminAuth, classController.updateClass)
router.delete("/delete", studendMiddleware.checkAdminAuth, classController.deleteClass)

export default router;