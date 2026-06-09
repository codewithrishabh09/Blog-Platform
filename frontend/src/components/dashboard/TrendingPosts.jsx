function TrendingPosts() {

  const posts = [
    {
      title: "React Complete Guide",
      views: 1200
    },
    {
      title: "FastAPI Tutorial",
      views: 950
    },
    {
      title: "MongoDB Aggregation",
      views: 850
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Trending Posts
      </h2>

      {posts.map((post, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          <h3>{post.title}</h3>

          <p className="text-gray-500">
            {post.views} Views
          </p>
        </div>
      ))}

    </div>
  );
}

export default TrendingPosts;