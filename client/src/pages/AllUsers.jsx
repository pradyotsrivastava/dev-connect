import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserCard from "@/components/UserCard";
import Loader from "@/components/Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const AllUsers = () => {
  const firstRun = useRef(true);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchQuery = "") => {
    try {
      setLoading(true);
      const url =
        searchQuery.trim() === ""
          ? `${BASE_URL}/api/users/get-all-users`
          : `${BASE_URL}/api/users/search-users/${encodeURIComponent(
              searchQuery
            )}`;

      const { data } = await axios.get(url);
      setUsers(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      const debounce = setTimeout(() => {
        fetchUsers(query);
      }, 500);

      return () => clearTimeout(debounce);
    } else {
      firstRun.current = false;
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Users</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          className="w-full border px-4 py-2 rounded shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader count={6} type="card" />
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
