import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updateCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-current-user", protect, getCurrentUser);
router.put("/update-current-user", protect, updateCurrentUser);

export default router;
