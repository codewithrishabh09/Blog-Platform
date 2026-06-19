import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import useAuthStore from "../../store/authStore";
import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const rehydrate = async () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        try {
          const res = await API.get("/auth/me");
          login(res.data);
        } catch {
          localStorage.removeItem("token");
        }
      }
    };
    rehydrate();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm transition-colors duration-150 ${isActive(path)
      ? "text-[#1A1A1A] font-medium"
      : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
    }`;

  return (
    <nav className="bg-[#FAF9F6] border-b border-[#E8E6E0] px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl tracking-tight text-[#1A1A1A]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        InkVerse
      </Link>

      <div className="flex items-center gap-7">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link to="/create-post" className={linkClass("/create-post")}>Write</Link>
        <Link to="/bookmarks" className={linkClass("/bookmarks")}>Bookmarks</Link>

        <NotificationBell />

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#4C4A9E] hover:text-[#4C4A9E] transition-colors duration-150"
            >
              {user.username}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-[#E8E6E0] rounded-lg shadow-md py-1.5 overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-[#1A1A1A]/80 hover:bg-[#F4F2EC] transition-colors duration-150"
                >
                  Profile
                </Link>
                <Link
                  to="/bookmarks"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-[#1A1A1A]/80 hover:bg-[#F4F2EC] transition-colors duration-150"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#F4F2EC] transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#4C4A9E] hover:text-[#4C4A9E] transition-colors duration-150"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;