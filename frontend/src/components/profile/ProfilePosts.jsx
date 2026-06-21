import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProfilePosts({ posts }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        My posts
      </h2>

      {!posts || posts.length === 0 ? (
        <p className="text-sm text-[#1A1A1A]/40">
          No posts yet.{" "}
          <Link to="/create-post" className="text-[#4C4A9E] hover:underline">
            Write your first one →
          </Link>
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post._id}
              to={post.status === "published" ? `/post/${post.slug}` : `/edit-post/${post._id}`}
              className="flex items-center justify-between py-3 border-b border-[#E8E6E0] last:border-b-0 group"
            >
              <span className="text-sm text-[#1A1A1A]/80 group-hover:text-[#4C4A9E] transition-colors duration-150">
                {post.title}
              </span>
              <span
                className="text-xs text-[#1A1A1A]/40 shrink-0 ml-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {post.status === "published" ? "published" : "draft"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ProfilePosts;