import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import ConversationList from "../components/messaging/ConversationList";
import ChatWindow from "../components/messaging/ChatWindow";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await API.get("/messages/conversations");
        setConversations(res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeConversation = conversations.find(
    (c) => c.user_id === activeUserId
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Direct
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Messages
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white border border-[#E8E6E0] rounded-xl overflow-hidden h-96">
            <ConversationList
              conversations={conversations}
              activeUserId={activeUserId}
              onSelect={setActiveUserId}
            />
          </div>

          <div className="md:col-span-2">
            <ChatWindow
              otherUserId={activeUserId}
              otherUsername={activeConversation?.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
}