import Comment from "../models/comment.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create a comment
export const createComment = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const { text } = req.body;

  const comment = await Comment.create({
    user: req.user._id,
    project: projectId,
    text,
  });

  res.status(201).json(comment);
});

// Get all comments for a project
export const getCommentsByProject = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ project: req.params.projectId })
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 });

  res.json(comments);
});

// Update a comment — only comment owner can update
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this comment");
  }

  comment.text = text || comment.text;
  await comment.save();

  res.json(comment);
});

// Delete a comment — only comment owner can delete
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this comment");
  }

  await comment.remove();

  res.json({ message: "Comment deleted" });
});
