import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

createTask,

getTasks,

getTaskById,

updateTask,

deleteTask,

updateTaskStatus

} from "../controllers/taskController.js";

const router = express.Router();

// Create Task
router.post("/:projectId", protect, createTask);

// Get All Tasks of Project
router.get("/project/:projectId", protect, getTasks);

// Get Single Task
router.get("/:id", protect, getTaskById);

// Update Task
router.put("/:id", protect, updateTask);

// Update Status
router.patch("/:id/status", protect, updateTaskStatus);

// Delete Task
router.delete("/:id", protect, deleteTask);

export default router;