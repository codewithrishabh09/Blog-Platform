function MessageInput() {
  return (
    <div className="flex gap-3 mt-4">

      <input
        type="text"
        placeholder="Type message..."
        className="border p-3 flex-1"
      />

      <button className="bg-blue-600 text-white px-5 rounded">
        Send
      </button>

    </div>
  );
}

export default MessageInput;