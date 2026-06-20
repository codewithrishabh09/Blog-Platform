import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import useAuthStore from "../../store/authStore";

function ChatWindow({ otherUserId, otherUsername }) {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!otherUserId) return;

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${otherUserId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [otherUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await API.post(`/messages/${otherUserId}`, {
        body: input,
      });
      setMessages([...messages, res.data]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!otherUserId) {
    return (
      <div className="flex items-center justify-center h-full text-[#1A1A1A]/40 text-sm">
        Select a conversation to start chatting.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E8E6E0] h-96 flex flex-col">
      <div className="px-5 py-3 border-b border-[#E8E6E0]">
        <h2
          className="font-medium text-[#1A1A1A]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {otherUsername}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex justify-center pt-8">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#4C4A9E] border-t-transparent"></div>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-[#1A1A1A]/40 text-center pt-8">
            No messages yet. Say hi 👋
          </p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender_id === user?.id
                  ? "bg-[#4C4A9E] text-white ml-auto"
                  : "bg-[#F4F2EC] text-[#1A1A1A]"
                }`}
            >
              {msg.body}
            </motion.div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex gap-2 p-3 border-t border-[#E8E6E0]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E8E6E0] rounded-full text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#4C4A9E] text-white text-sm rounded-full hover:bg-[#3D3B80] transition-colors duration-150"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;