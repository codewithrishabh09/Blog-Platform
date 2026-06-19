import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function BookmarkCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Link
        to={`/post/${post.slug}`}
        className="group flex items-start gap-5 py-6 border-b border-[#E8E6E0] hover:bg-[#F4F2EC] transition-colors duration-150 px-2 -mx-2 rounded-md"
      >
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="w-16 h-16 rounded object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h2
            className="text-xl text-[#1A1A1A] group-hover:text-[#4C4A9E] transition-colors duration-150 mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {post.title}
          </h2>
          <p className="text-sm text-[#1A1A1A]/50">
            {post.author_username || "Unknown"}
            {post.tags && post.tags.length > 0 && (
              <span> · {post.tags.slice(0, 2).join(", ")}</span>
            )}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default BookmarkCard;