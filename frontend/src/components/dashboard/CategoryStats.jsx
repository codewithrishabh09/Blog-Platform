import { motion } from "framer-motion";

const categories = [
  { name: "Technology", percent: 38 },
  { name: "Lifestyle", percent: 27 },
  { name: "Travel", percent: 19 },
  { name: "Food", percent: 16 },
];

export default function CategoryStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Categories
      </h2>
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#1A1A1A]/80">{cat.name}</span>
              <span
                className="text-[#1A1A1A]/50"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {cat.percent}%
              </span>
            </div>
            <div className="h-1.5 bg-[#F4F2EC] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.percent}%` }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                className="h-full bg-[#4C4A9E] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}