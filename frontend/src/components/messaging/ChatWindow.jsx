import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function ChatWindow({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    try {
      const response = await API.get(`/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await API.post("/messages", {
        receiverId: userId,
        content: input,
      });
      setMessages([...messages, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${msg.senderId === userId
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
