function ActivityFeed() {

  const activities = [
    "John liked your post",
    "David commented on React Tutorial",
    "Sarah bookmarked your blog",
    "Emma followed your profile"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Activity Feed
      </h2>

      {activities.map((item, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {item}
        </div>
      ))}

    </div>
  );
}

export default ActivityFeed;