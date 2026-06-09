function RelatedPosts() {

  const posts = [
    "React Advanced Guide",
    "Node.js Tutorial",
    "FastAPI Authentication"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">
        Related Posts
      </h2>

      {posts.map((post, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {post}
        </div>
      ))}

    </div>
  );
}

export default RelatedPosts;