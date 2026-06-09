import Navbar from "../components/navbar/Navbar";

import ChatWindow from "../components/messaging/ChatWindow";
import MessageInput from "../components/messaging/MessageInput";
import ConversationList from "../components/messaging/ConversationList";

function Messages() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <div className="grid md:grid-cols-4 gap-6">

          <ConversationList />

          <div className="md:col-span-3">

            <ChatWindow />

            <MessageInput />

          </div>

        </div>

      </div>
    </>
  );
}

export default Messages;