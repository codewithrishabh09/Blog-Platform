import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/posts/", {
        title,
        body,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate(`/post/${response.data.slug}`);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Couldn't create the post. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          New Entry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Write something
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-red-500 mb-6"
          >
            {error}
          </motion.p>
        )}

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <div>
            <label className="block text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A clear, simple title"
              className="w-full bg-transparent border-b border-[#E8E6E0] pb-3 text-2xl text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
              style={{ fontFamily: "'Fraunces', serif" }}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-2">
              Content
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Start writing…"
              className="w-full bg-white border border-[#E8E6E0] rounded-lg p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 leading-relaxed focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
              rows="12"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="comma, separated, tags"
              className="w-full px-3 py-2.5 bg-white border border-[#E8E6E0] rounded-lg text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="bg-[#4C4A9E] text-white px-6 py-2.5 rounded-full hover:bg-[#3D3B80] disabled:opacity-50 transition-colors duration-150"
          >
            {loading ? "Publishing…" : "Publish"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}