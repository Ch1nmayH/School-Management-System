import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Student API");
})



export default router;