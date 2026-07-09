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


router.post("/:projectId", protect, createTask);
router.get("/project/:projectId", protect, getTasks);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);
router.patch("/:id/status", protect, updateTaskStatus);


router.delete("/:id", protect, deleteTask);

export default router;