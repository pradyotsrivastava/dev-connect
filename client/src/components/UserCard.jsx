import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const UserCard = ({ user }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => setShowFullBio((prev) => !prev);

  const bio =
    user.bio.length > 200 && !showFullBio
      ? `${user.bio.slice(0, 200)}...`
      : user.bio;

  const createdAt = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="border border-blue-400 p-6 rounded-lg shadow hover:shadow-lg transition bg-white">
      <div className="flex items-center gap-4 mb-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <FaUserCircle className="text-blue-400 w-14 h-14" />
        )}
        <div>
          <h3 className="text-2xl font-bold text-blue-700">{user.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <AiOutlineMail /> {user.email}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <AiOutlinePhone /> {user.phone}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-800 text-sm leading-relaxed">
        {bio}
        {user.bio.length > 200 && (
          <button
            className="text-blue-600 font-medium ml-1 hover:underline"
            onClick={toggleBio}
          >
            {showFullBio ? "Show Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-500">
        Joined on: <span className="font-medium">{createdAt}</span>
      </div>
    </div>
  );
};

export default UserCard;
