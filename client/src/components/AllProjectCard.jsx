import CommentsSlider from "@/components/CommentsSlider";
import { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllProjectCard = ({ project }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const startDate = formatDate(project.startDate);
  const endDate = formatDate(project.endDate);

  const toggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };

  const hasLink = Boolean(project.link && project.link.trim() !== "");

  return (
    <div className="border border-lime-400 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white relative">
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
        {showFullDesc
          ? project.description
          : project.description.length > 300
          ? project.description.slice(0, 300) + "..."
          : project.description}
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
        {hasLink ? (
          <Link
            to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold bg-lime-500 text-white hover:bg-lime-600 transition"
            onClick={(e) => e.stopPropagation()}
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

        {/* Comment Button */}
        <button
          className="px-4 py-2 rounded-full text-sm font-semibold bg-lime-500 text-white hover:bg-lime-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            setShowComments((prev) => !prev);
          }}
        >
          {showComments ? "Hide Comments" : "Comments"}
        </button>
      </div>

      {/* Comments slider */}
      {showComments && (
        <div className="mt-6">
          <CommentsSlider
            projectId={project._id}
            currentUserId={userId}
            onClose={() => setShowComments(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AllProjectCard;
