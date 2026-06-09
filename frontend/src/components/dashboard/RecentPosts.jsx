function RecentPosts() {

  const posts = [
    {
      title: "React Tutorial"
    },
    {
      title: "FastAPI Guide"
    },
    {
      title: "MongoDB Basics"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Recent Posts
      </h2>

      {posts.map((post, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {post.title}
        </div>
      ))}

    </div>
  );
}

export default RecentPosts;