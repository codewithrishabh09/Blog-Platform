import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";

function BookmarkButton({ postId }) {
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkBookmark = async () => {
            try {
                const res = await API.get("/bookmarks/");
                const isBookmarked = res.data.some((p) => p._id === postId);
                setBookmarked(isBookmarked);
            } catch {
                // not logged in or error — silently ignore
            }
        };
        checkBookmark();
    }, [postId]);

    const toggle = async () => {
        setLoading(true);
        try {
            const res = await API.post(`/bookmarks/${postId}`);
            setBookmarked(res.data.bookmarked);
        } catch {
            // not logged in — silently ignore
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.button
            onClick={toggle}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors duration-150 ${bookmarked
                    ? "border-[#4C4A9E] text-[#4C4A9E] bg-[#4C4A9E]/5"
                    : "border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:border-[#4C4A9E] hover:text-[#4C4A9E]"
                }`}
        >
            {bookmarked ? "Bookmarked" : "Bookmark"}
        </motion.button>
    );
}

export default BookmarkButton;