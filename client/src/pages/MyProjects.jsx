import Loader from "@/components/Loader";
import ProjectCard from "@/components/ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const userId = userInfo?._id;

  const handleDelete = async (projectId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `${BASE_URL}/api/projects/delete-project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Project deleted successfully!");
      setProjects((prev) => prev.filter((proj) => proj._id !== projectId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/projects/get-projects-by-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch your projects"
        );
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate, token, userId]);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Loader count={6} type="card" />
      </div>
    );

  if (error)
    return <div className="p-4 text-red-600 font-semibold">{error}</div>;

  if (!projects.length)
    return (
      <div className="p-4">
        You don't have any projects yet.{" "}
        <Link
          to="/create-project"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Create one now
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id}>
            <ProjectCard
              project={project}
              onEdit={() => navigate(`/edit-project?id=${project._id}`)}
              onDelete={() => handleDelete(project._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProjects;
