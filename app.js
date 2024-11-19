import express from "express"
import "dotenv/config";

import studentRouter from "./routes/studentRoute.js"
import teacherRouter from "./routes/teacherRoute.js"
import classRouter from "./routes/classRoute.js"

import dbConnection from "./config/dbConnection.js"

const app = express();

app.get("/", (req , res)=>{
    res.send("SCHOOL MANAGEMENT SYSTEM")
});

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/class", classRouter);

const port = process.env.PORT || 6000;

app.listen(port, ()=>{

    dbConnection();
    console.log(`Server started @ port ${port}`);

})