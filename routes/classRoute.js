import { Router } from "express";
import classController from "../controller/classController.js";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Class API");
})

router.post("/addClass", classController.addClass)
router.get("/getall", classController.getAllClass)

export default router;