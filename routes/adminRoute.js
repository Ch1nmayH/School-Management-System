import { Router } from "express";
import adminController from "../controller/adminController.js";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Admin API");
})

router.post(
    "/addAdmin",
    studentMiddleware.checkAdminAuth,
    adminController.addAdmin
  );

router.post("/login", adminController.login)
router.get("/logout", adminController.logout)

export default router;