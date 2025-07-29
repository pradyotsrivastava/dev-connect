import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByUser,
  updateProject,
  deleteProject,
  searchProjects,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-project", protect, createProject);
router.get("/get-all-projects", getAllProjects);
router.get("/get-project/:id", getProjectById);
router.get("/get-projects-by-user/:userId", getProjectsByUser);
router.put("/update-project/:id", protect, updateProject);
router.delete("/delete-project/:id", protect, deleteProject);
router.get("/search-projects/:query", searchProjects);

export default router;
