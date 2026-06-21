import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";

const mockAuthors = [
  { username: "Rishabh", posts: 14 },
  { username: "John", posts: 11 },
  { username: "Sarah", posts: 9 },
  { username: "David", posts: 7 },
];

function PopularAuthors() {
  const [authors, setAuthors] = useState(mockAuthors);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await API.get("/users/popular");
        if (res.data && res.data.length > 0) {
          setAuthors(res.data);
        }
      } catch {
        // backend not ready / error — keep mock data as fallback
      }
    };
    fetchAuthors();
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-0 py-12 border-t border-[#E8E6E0]">
      <p
        className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Popular authors
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {authors.map((author, i) => (
          <motion.div
            key={author.username}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group bg-white/60 backdrop-blur-md border border-[#E8E6E0] rounded-xl p-5 text-center hover:border-[#4C4A9E]/40 hover:bg-white hover:shadow-xl hover:shadow-[#4C4A9E]/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-14 h-14 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4C4A9E] to-[#7A8B6F] opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-500 scale-105"></div>
              <div
                className="relative w-full h-full rounded-full bg-[#1A1A1A] group-hover:bg-[#4C4A9E] transition-colors duration-300 text-white flex items-center justify-center text-xl z-10"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {author.username[0]?.toUpperCase()}
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#1A1A1A] mb-1 group-hover:text-[#4C4A9E] transition-colors">{author.username}</h3>
            <p
              className="text-xs text-[#1A1A1A]/40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {author.posts} posts
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PopularAuthors;