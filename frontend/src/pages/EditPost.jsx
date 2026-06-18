import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/posts/id/${id}`);
        const post = response.data;

        setTitle(post.title);
        setBody(post.body);
        setTags(post.tags ? post.tags.join(", ") : "");
        setSlug(post.slug);
      } catch (err) {
        setError("Couldn't load this post for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await API.put(`/posts/${id}`, {
        title,
        body,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate(`/post/${slug}`);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Couldn't save changes. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
        </div>
      </div>
    );
  }

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
          Editing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Edit post
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
              className="w-full bg-transparent border-b border-[#E8E6E0] pb-3 text-2xl text-[#1A1A1A] focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
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
              className="w-full bg-white border border-[#E8E6E0] rounded-lg p-4 text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
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
            disabled={saving}
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
            className="bg-[#4C4A9E] text-white px-6 py-2.5 rounded-full hover:bg-[#3D3B80] disabled:opacity-50 transition-colors duration-150"
          >
            {saving ? "Saving…" : "Save changes"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}