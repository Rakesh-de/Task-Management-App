// import express from "express"

// const app = express();

// app.get("/",(req,res)=>{
//     res.send("Backend Running");
// })

// const PORT = 5000;
// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`);
// })

import express from "express";
import dotenv from  "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound , errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();


// middleware
// app.use(cors());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//health check
app.get("/",(req,res)=>{
    res.json({
        success : true,
        message : "API SUCESSFULLY RUN"
    })
})

app.get("/api/health",(req,res)=>{
    res.status(200).json({
            status : "ok",
            message : "Server Healthy"
    })

})

// Routes

app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);

app.use("/api/tasks",taskRoutes);

//Error Middleware
app.use(notFound)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});