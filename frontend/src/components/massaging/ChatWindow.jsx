function ChatWindow() {
  return (
    <div className="bg-white rounded-xl shadow h-96 p-5">

      <h2 className="font-bold mb-4">
        Messages
      </h2>

      <div className="space-y-4">

        <div className="bg-blue-100 p-3 rounded">
          Hello 👋
        </div>

        <div className="bg-gray-100 p-3 rounded">
          Hi there!
        </div>

      </div>

    </div>
  );
}

export default ChatWindow;