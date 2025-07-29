import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AllProjectCard from "@/components/AllProjectCard";
import Loader from "@/components/Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const AllProjects = () => {
  const firstRun = useRef(true);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (searchQuery = "") => {
    try {
      setLoading(true);
      let url = "";
      if (searchQuery.trim() === "") {
        url = `${BASE_URL}/api/projects/get-all-projects`;
      } else {
        url = `${BASE_URL}/api/projects/search-projects/${encodeURIComponent(
          searchQuery
        )}`;
      }

      const { data } = await axios.get(url);
      setProjects(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      const debounce = setTimeout(() => {
        fetchProjects(query);
      }, 500);

      return () => clearTimeout(debounce);
    } else {
      firstRun.current = false;
    }
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects by title..."
          className="w-full border px-4 py-2 rounded shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader count={6} type="card" />
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500">No projects found.</div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <AllProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
