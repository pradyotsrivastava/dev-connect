import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiOutlineLink } from "react-icons/ai";

const ProjectCard = ({ project, onEdit, onDelete, onClick }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const toggleDescription = () => setShowFullDesc((prev) => !prev);

  const description =
    project.description.length > 300 && !showFullDesc
      ? `${project.description.slice(0, 300)}... `
      : project.description;

  const startDate = new Date(project.startDate).toLocaleDateString();
  const endDate = new Date(project.endDate).toLocaleDateString();

  const hasLink = Boolean(project.link && project.link.trim());

  return (
    <div
      className="border border-lime-400 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-lime-600 mb-2">{project.title}</h2>

      {/* Dates & Category */}
      <div className="text-sm text-gray-600 mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <span>
          <strong>Duration:</strong> {startDate} - {endDate}
        </span>
        <span className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-xs font-semibold w-fit">
          {project.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-base text-gray-800 leading-relaxed">
        {description}
        {project.description.length > 300 && (
          <button
            className="text-lime-600 font-medium ml-1 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toggleDescription();
            }}
          >
            {showFullDesc ? "Show Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-lime-200 text-lime-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {/* Visit / Link Button */}
        {hasLink ? (
          <Link
            to={project.link}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition bg-lime-500 text-white hover:bg-lime-600"
          >
            <AiOutlineLink className="w-4 h-4" />
            Visit
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            <AiOutlineLink className="w-4 h-4" />
            Visit
          </button>
        )}

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 text-sm font-semibold transition"
        >
          <AiFillEdit className="w-4 h-4" />
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 text-sm font-semibold transition"
        >
          <AiFillDelete className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
