function ConversationList() {

  const chats = [
    "John",
    "Sarah",
    "Emma"
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      {chats.map((chat, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {chat}
        </div>
      ))}

    </div>
  );
}

export default ConversationList;