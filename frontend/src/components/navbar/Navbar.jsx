import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">InkVerse</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-post">Write</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;