function FollowingList() {

  const following = [
    "React Dev",
    "FastAPI Expert",
    "MongoDB Team"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Following
      </h2>

      {following.map((user, index) => (
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

export default FollowingList;