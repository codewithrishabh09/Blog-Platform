import { motion } from "framer-motion";

function ProfileHeader({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-8 flex items-center gap-6"
    >
      <div className="w-20 h-20 rounded-full bg-[#4C4A9E] text-white flex items-center justify-center text-3xl shrink-0"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {user.username?.[0]?.toUpperCase() || "?"}
      </div>

      <div>
        <h1
          className="text-3xl text-[#1A1A1A] mb-1"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {user.username}
        </h1>
        <p className="text-sm text-[#1A1A1A]/50 mb-1">{user.email}</p>
        {user.bio && (
          <p className="text-sm text-[#1A1A1A]/70">{user.bio}</p>
        )}
        <span
          className="inline-block mt-2 text-xs uppercase tracking-wide text-[#7A8B6F]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {user.role}
        </span>
      </div>
    </motion.div>
  );
}

export default ProfileHeader;