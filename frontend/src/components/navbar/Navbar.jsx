import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm transition-colors duration-150 ${
      isActive(path)
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
        <Link
          to="/login"
          className="text-sm px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#4C4A9E] hover:text-[#4C4A9E] transition-colors duration-150"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;