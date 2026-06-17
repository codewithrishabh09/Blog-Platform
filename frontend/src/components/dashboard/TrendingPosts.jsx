import { motion } from "framer-motion";

const trending = [
  { title: "The Art of Slow Mornings", views: "2.1K" },
  { title: "Why I Quit Social Media", views: "1.8K" },
  { title: "Notes on Building Habits", views: "1.4K" },
  { title: "A Letter to My Younger Self", views: "1.1K" },
];

export default function TrendingPosts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Trending posts
      </h2>
      <div>
        {trending.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.35 + i * 0.08 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 py-2.5 border-b border-[#E8E6E0] last:border-b-0"
          >
            <span
              className="text-xs text-[#7A8B6F] w-4 shrink-0"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {i + 1}
            </span>
            <p className="flex-1 text-sm text-[#1A1A1A] truncate">{post.title}</p>
            <span
              className="text-xs text-[#1A1A1A]/50 shrink-0"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {post.views}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}