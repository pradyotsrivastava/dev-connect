import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEdit,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const AddCommentBox = ({ newComment, setNewComment, onAdd }) => (
  <div className="mt-6">
    <label className="block text-sm text-gray-700 mb-1">Add a Comment</label>
    <div className="flex flex-col gap-2">
      <textarea
        rows={2}
        placeholder="Write your comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="flex-grow p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <button
        onClick={onAdd}
        disabled={!newComment.trim()}
        className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition disabled:opacity-50"
      >
        Post
      </button>
    </div>
  </div>
);

const CommentsSlider = ({ projectId, currentUserId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        console.log("Sending token:", token);

        const { data } = await axios.get(
          `${BASE_URL}/api/comments/get-comments/${projectId}`
        );
        setComments(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [projectId, token]);

  const handlePrev = () => {
    setCurrentIndex((idx) => (idx === 0 ? comments.length - 1 : idx - 1));
  };

  const handleNext = () => {
    setCurrentIndex((idx) => (idx === comments.length - 1 ? 0 : idx + 1));
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/comments/create-comment/${projectId}`,
        { text: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setComments((prev) => [data, ...prev]);
      setNewComment("");
      setCurrentIndex(0);
      toast.success("Comment added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const saveEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/comments/update-comment/${commentId}`,
        { text: editText },
        { withCredentials: true }
      );
      setComments((prev) => prev.map((c) => (c._id === commentId ? data : c)));
      setEditingCommentId(null);
      setEditText("");
      toast.success("Comment updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      setLoading(true);
      await axios.delete(
        `${BASE_URL}/api/comments/delete-comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setCurrentIndex(0);
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (comments.length === 0)
    return (
      <div className="p-4 text-center">
        <p>No comments yet. Be the first to comment!</p>
        <AddCommentBox
          newComment={newComment}
          setNewComment={setNewComment}
          onAdd={handleAddComment}
        />
        <button onClick={onClose} className="mt-4 underline text-blue-600">
          Close
        </button>
      </div>
    );

  const currentComment = comments[currentIndex];

  return (
    <div className="border rounded-lg shadow-md bg-white max-w-md mx-auto relative p-6">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition"
        title="Close Comments"
      >
        <FiX size={22} />
      </button>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentComment.user.name}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(currentComment.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2 mr-6">
            {currentComment.user._id === currentUserId &&
              editingCommentId !== currentComment._id && (
                <>
                  <button
                    onClick={() => startEdit(currentComment)}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteComment(currentComment._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </>
              )}
          </div>
        </div>

        {editingCommentId === currentComment._id ? (
          <>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => saveEdit(currentComment._id)}
                className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-800 text-base whitespace-pre-wrap">
            {currentComment.text}
          </p>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-2 py-1 bg-lime-100 text-lime-600 rounded hover:bg-lime-200"
          >
            <FiArrowLeft /> Prev
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-2 py-1 bg-lime-100 text-lime-600 rounded hover:bg-lime-200"
          >
            Next <FiArrowRight />
          </button>
        </div>
      </div>

      <AddCommentBox
        newComment={newComment}
        setNewComment={setNewComment}
        onAdd={handleAddComment}
      />
    </div>
  );
};

export default CommentsSlider;
