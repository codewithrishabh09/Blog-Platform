function ActivityFeed() {
  const activities = [
    "John liked your post",
    "David commented on React Tutorial",
    "Sarah bookmarked your blog",
    "Emma followed your profile",
  ];

  return (
    <div className="bg-white border border-[#E8E6E0] rounded-xl p-6">
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Activity
      </h2>

      {activities.map((item, index) => (
        <div
          key={index}
          className="py-3 border-b border-[#E8E6E0] last:border-b-0 text-sm text-[#1A1A1A]/70"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;