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
            className="bg-white border border-[#E8E6E0] rounded-xl p-5 text-center"
          >
            <div
              className="w-14 h-14 rounded-full bg-[#4C4A9E] text-white flex items-center justify-center text-xl mx-auto mb-3"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {author.username[0]?.toUpperCase()}
            </div>
            <h3 className="text-sm text-[#1A1A1A] mb-1">{author.username}</h3>
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