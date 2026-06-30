import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes Imports
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Middleware Imports
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Global Middlewares (Inhe hamesha routes se PEHLE hona chahiye)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// 2. Base Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project Management API Running"
    });
});

// 3. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// 4. Error Handling Middlewares (Inhe hamesha sabse AAKHIRI mein hona chahiye)
app.use(notFound);
app.use(errorHandler);

// 5. Server Initialization (Is line ki wajah se server chalta rahega)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;