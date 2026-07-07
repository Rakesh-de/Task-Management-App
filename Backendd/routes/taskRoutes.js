import express from "express"
import protect from "../middleware/authMiddleware.js"

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("./:projectId",protect,createTask);

router.get("./:projectId",protect,getTasks);

router.get("./task/:id",protect,getTask);

router.put("./:id",protect,updateTask);

router.delete("./:id",protect,deleteTask);

export default router;