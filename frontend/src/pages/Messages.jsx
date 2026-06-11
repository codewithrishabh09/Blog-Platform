import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await API.get("/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">
                    {message.subject}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{message.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  From: {message.sender.username}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
