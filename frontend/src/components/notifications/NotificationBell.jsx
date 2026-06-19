import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import useAuthStore from "../../store/authStore";

function NotificationBell() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const res = await API.get("/notifications/");
        setNotifications(res.data);
      } catch {
        // not logged in or error
      }
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    try {
      await API.post("/notifications/read-all");
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch { }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-150"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#4C4A9E] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-[#E8E6E0] rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E6E0]">
              <h3
                className="text-sm text-[#1A1A1A]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-[#4C4A9E] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-[#1A1A1A]/40 text-center py-8">
                  No notifications yet.
                </p>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <div
                    key={n._id}
                    className={`px-4 py-3 border-b border-[#E8E6E0] last:border-b-0 ${!n.read ? "bg-[#F4F2EC]" : ""
                      }`}
                  >
                    <p className="text-sm text-[#1A1A1A]/80">
                      <span className="font-medium text-[#1A1A1A]">
                        {n.sender_username}
                      </span>{" "}
                      {n.type === "like" ? "liked" : "commented on"}{" "}
                      <span className="text-[#4C4A9E]">
                        {n.post_title}
                      </span>
                    </p>
                    <p
                      className="text-xs text-[#1A1A1A]/40 mt-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {new Date(n.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-[#E8E6E0]">
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="text-xs text-[#4C4A9E] hover:underline"
              >
                View all notifications →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;