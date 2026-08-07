import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.access_token);

      const me = await API.get("/auth/me");
      login(me.data);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Couldn't log you in. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="block text-center text-2xl tracking-tight text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          InkVerse
        </Link>

        <div className="bg-white border border-[#E8E6E0] rounded-xl p-8">
          <h1
            className="text-2xl text-[#1A1A1A] mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-[#1A1A1A]/50 mb-6">
            Log in to keep writing.
          </p>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E6E0] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E6E0] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4C4A9E] text-white py-2.5 rounded-lg hover:bg-[#3D3B80] disabled:opacity-50 transition-colors duration-150"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-sm text-[#1A1A1A]/50 mt-6 text-center">
            New here?{" "}
            <Link to="/register" className="text-[#4C4A9E] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}