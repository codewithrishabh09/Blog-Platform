function FollowersList() {

  const followers = [
    "John",
    "Sarah",
    "Emma",
    "David"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Followers
      </h2>

      {followers.map((user, index) => (
        <div
          key={index}
          className="py-2 border-b"
        >
          {user}
        </div>
      ))}

    </div>
  );
}

export default FollowersList;