import { useState } from "react";
import { motion } from "framer-motion";

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={submit} className="mb-10">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-4 bg-white border border-[#E8E6E0] rounded-lg mb-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
        rows="3"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-sm px-5 py-2 rounded-full bg-[#4C4A9E] text-white hover:bg-[#3D3B80] transition-colors duration-150"
      >
        Post comment
      </motion.button>
    </form>
  );
}

export default CommentForm;