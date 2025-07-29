import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  searchUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getUserById);
router.get("/search-users/:query", searchUsers);
router.delete("/delete-user/:id", protect, deleteUser);

export default router;
