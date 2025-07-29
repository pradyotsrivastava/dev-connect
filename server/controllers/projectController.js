import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/project.js";

// Create a new project
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, link, category, skills, startDate, endDate } =
    req.body;

  const project = await Project.create({
    user: req.user._id,
    title,
    description,
    link,
    category,
    skills,
    startDate,
    endDate,
  });
  res.status(201).json(project);
});

// Get all projects (public)
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 });
  res.json(projects);
});

// Get single project by ID (public)
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("user", "name profileImage")
    .populate("comments.user", "name profileImage");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.json(project);
});

// Get projects by a specific user (public)
export const getProjectsByUser = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.params.userId })
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 });
  res.json(projects);
});

// Update project (protected + owner only)
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, link, category, skills } = req.body;

  const project = await Project.findById(id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  project.title = title || project.title;
  project.description = description || project.description;
  project.link = link || project.link;
  project.category = category || project.category;
  project.skills = skills || project.skills;

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// Delete project (protected + owner only)
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await project.remove();
  res.json({ message: "Project removed" });
});

// Search projects by title, description, category, or skills (public)
export const searchProjects = asyncHandler(async (req, res) => {
  const { query } = req.params;

  const projects = await Project.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { skills: { $regex: query, $options: "i" } },
    ],
  }).populate("user", "name profileImage");

  res.json(projects);
});
