import { motion } from "framer-motion";

function ProfileStats({ postCount }) {
  const stats = [
    { label: "Posts", value: postCount ?? "—" },
    { label: "Followers", value: "—" },
    { label: "Following", value: "—" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Stats
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className="text-2xl text-[#1A1A1A] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {stat.value}
            </p>
            <p
              className="text-xs uppercase tracking-wide text-[#1A1A1A]/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProfileStats;