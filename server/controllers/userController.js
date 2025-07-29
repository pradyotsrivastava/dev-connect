// import User from "../models/user.js";

// // Get all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// // Get user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user" });
//   }
// };

// // Search users by name or other fields
// export const searchUsers = async (req, res) => {
//   const query = req.params.query;
//   try {
//     const users = await User.find({
//       name: { $regex: query, $options: "i" }, // case-insensitive search
//     }).select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to search users" });
//   }
// };

// // Delete user
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Optional: add authorization check to ensure only user or admin can delete

//     await user.remove();
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user" });
//   }
// };

import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// Search users by name
export const searchUsers = asyncHandler(async (req, res) => {
  const query = req.params.query;
  const users = await User.find({
    name: { $regex: query, $options: "i" },
  }).select("-password");
  res.json(users);
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // Add auth checks here if needed

  await user.remove();
  res.json({ message: "User deleted successfully" });
});
