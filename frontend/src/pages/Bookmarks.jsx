import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import BookmarkCard from "../components/bookmarks/BookmarkCard";

export default function Bookmarks() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await API.get("/bookmarks/");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Saved
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Bookmarks
        </motion.h1>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="border-t border-[#E8E6E0] py-16 text-center">
            <p className="text-[#1A1A1A]/50">No bookmarks yet.</p>
          </div>
        ) : (
          <div className="border-t border-[#E8E6E0]">
            {posts.map((post, i) => (
              <BookmarkCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}