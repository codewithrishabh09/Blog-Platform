import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-6 md:px-0 mb-16"
    >
      <Link
        to={`/post/${post.slug}`}
        className="group block bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden hover:border-[#4C4A9E] transition-colors duration-150"
      >
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="w-full h-72 object-cover"
          />
        )}

        <div className="p-8">
          <span
            className="text-xs uppercase tracking-[0.2em] text-[#4C4A9E]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Featured
          </span>

          <h2
            className="text-3xl text-[#1A1A1A] mt-3 mb-3 group-hover:text-[#4C4A9E] transition-colors duration-150"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {post.title}
          </h2>

          <p className="text-sm text-[#1A1A1A]/50">
            {post.author_username || "Unknown"}
            {post.published_at && (
              <span>
                {" "}
                ·{" "}
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </p>
        </div>
      </Link>
    </motion.section>
  );
}

export default FeaturedPost;