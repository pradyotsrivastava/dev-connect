import express from "express";
import {
  createComment,
  getCommentsByProject,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-comment/:projectId", protect, createComment);
router.get("/get-comments/:projectId", getCommentsByProject);
router.put("/update-comment/:id", protect, updateComment);
router.delete("/delete-comment/:id", protect, deleteComment);

export default router;
