import express from "express"
import cors from "cors"
import "dotenv/config"
import connectCloudinary from "./config/cloudinary.js"
//app config
import dbcall from "./config/db.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"
const app=express();
const port=process.env.PORT||4000;

//middlewares
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
app.use(cors());

app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);
app.get("/",(req,res)=>{
    res.send("");
})





app.listen(port,()=>{
console.log("server running of port",port);
dbcall();
connectCloudinary();
});
