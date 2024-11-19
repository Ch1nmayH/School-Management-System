import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Class API");
})

export default router;