import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";

function TrendingSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await API.get("/posts/trending/top");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };
    fetchTrending();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-0 py-12 border-t border-[#E8E6E0]">
      <p
        className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Trending
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Link
              to={`/post/${post.slug}`}
              className="group flex items-center justify-between bg-white/50 backdrop-blur-sm border border-[#E8E6E0] rounded-xl p-5 hover:border-[#4C4A9E]/30 hover:bg-white hover:shadow-lg hover:shadow-[#4C4A9E]/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-sm text-[#1A1A1A]/80 group-hover:text-[#4C4A9E] transition-colors duration-150 truncate pr-3">
                {post.title}
              </span>
              <span
                className="text-xs text-[#1A1A1A]/40 shrink-0"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {post.views || 0} views
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;