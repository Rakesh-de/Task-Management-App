import express from "express"

import protect from "../middleware/authMiddleware.js"
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Create Project
router
  .route("/")
  .get(protect, getProjects)
  .post(protect, createProject);

router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);


export default router;