import { motion } from "framer-motion";

const authors = [
  { name: "Maya Chen", posts: 14, avatar: "M" },
  { name: "Daniel Cruz", posts: 11, avatar: "D" },
  { name: "Priya Nair", posts: 9, avatar: "P" },
  { name: "Sam Okafor", posts: 7, avatar: "S" },
];

export default function TopAuthors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Top authors
      </h2>
      <div>
        {authors.map((author, i) => (
          <motion.div
            key={author.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 py-2.5 border-b border-[#E8E6E0] last:border-b-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#4C4A9E] text-white flex items-center justify-center text-sm font-medium shrink-0">
              {author.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#1A1A1A]">{author.name}</p>
            </div>
            <span
              className="text-xs text-[#1A1A1A]/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {author.posts} posts
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}