import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoriesSection() {
  const categories = [
    { name: "Technology", icon: "💻" },
    { name: "Travel", icon: "✈️" },
    { name: "Food", icon: "🍔" },
    { name: "Health", icon: "❤️" },
    { name: "Finance", icon: "💰" },
    { name: "Lifestyle", icon: "🏠" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-0 py-12 border-t border-[#E8E6E0]">
      <p
        className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Browse by category
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="block bg-white border border-[#E8E6E0] p-4 rounded-xl hover:border-[#4C4A9E] transition-colors duration-150 text-center"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="text-xs text-[#1A1A1A]/70">{category.name}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}