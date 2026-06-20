import { motion } from "framer-motion";

function ConversationList({ conversations, activeUserId, onSelect }) {
    if (conversations.length === 0) {
        return (
            <p className="text-sm text-[#1A1A1A]/40 p-4">
                No conversations yet.
            </p>
        );
    }

    return (
        <div>
            {conversations.map((conv, i) => (
                <motion.button
                    key={conv.user_id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => onSelect(conv.user_id)}
                    className={`w-full text-left px-4 py-3 border-b border-[#E8E6E0] last:border-b-0 transition-colors duration-150 ${activeUserId === conv.user_id
                            ? "bg-[#F4F2EC]"
                            : "hover:bg-[#F4F2EC]/60"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-full bg-[#4C4A9E] text-white flex items-center justify-center text-sm shrink-0"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            {conv.username[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-[#1A1A1A] font-medium truncate">
                                {conv.username}
                            </p>
                            <p className="text-xs text-[#1A1A1A]/50 truncate">
                                {conv.last_message}
                            </p>
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}

export default ConversationList;