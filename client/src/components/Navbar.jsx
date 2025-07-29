import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { FaBars, FaCode, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    logout();
    navigate("/login");
  };

  const isLoggedIn = !!userInfo;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="hover:text-blue-400">
          <div className="flex items-center space-x-2">
            <FaCode className="text-2xl text-blue-400" />
            <span className="text-xl font-semibold">Dev Connect</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/create-project" className="hover:text-blue-400">
                Create
              </Link>
              <Link to="/my-projects" className="hover:text-blue-400">
                My Projects
              </Link>
              <Link to="/all-projects" className="hover:text-blue-400">
                All Projects
              </Link>
              <Link to="/all-users" className="hover:text-blue-400">
                All Users
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-4">
          {isLoggedIn ? (
            <>
              <Link to="/create-project" onClick={() => setMenuOpen(false)}>
                Create
              </Link>
              <Link to="/my-projects" onClick={() => setMenuOpen(false)}>
                My Projects
              </Link>
              <Link to="/all-projects" onClick={() => setMenuOpen(false)}>
                All Projects
              </Link>
              <Link to="/all-users" onClick={() => setMenuOpen(false)}>
                All Users
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
