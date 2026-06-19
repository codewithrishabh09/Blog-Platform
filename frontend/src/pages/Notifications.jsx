import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications/");
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await API.post("/notifications/read-all");
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch { }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Activity
        </motion.p>
        <div className="flex items-center justify-between mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-[#1A1A1A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Notifications
          </motion.h1>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={markAllRead}
              className="text-sm text-[#4C4A9E] hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="border-t border-[#E8E6E0] py-16 text-center">
            <p className="text-[#1A1A1A]/50">No notifications yet.</p>
          </div>
        ) : (
          <div className="border-t border-[#E8E6E0]">
            {notifications.map((n, i) => (
              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`py-4 border-b border-[#E8E6E0] last:border-b-0 ${!n.read ? "bg-[#F4F2EC] px-3 -mx-3 rounded-md" : ""
                  }`}
              >
                <p className="text-sm text-[#1A1A1A]/80">
                  <span className="font-medium text-[#1A1A1A]">
                    {n.sender_username}
                  </span>{" "}
                  {n.type === "like" ? "liked" : "commented on"}{" "}
                  <span className="text-[#4C4A9E]">{n.post_title}</span>
                </p>
                <p
                  className="text-xs text-[#1A1A1A]/40 mt-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {new Date(n.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}