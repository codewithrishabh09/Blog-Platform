function LatestBlogs() {
  const blogs = [
    {
      title: "React Masterclass",
      author: "Rishabh"
    },
    {
      title: "FastAPI Complete Guide",
      author: "John"
    },
    {
      title: "MongoDB Aggregation",
      author: "Sarah"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-8">
        Latest Blogs
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">
              {blog.title}
            </h3>

            <p className="text-gray-500">
              By {blog.author}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default LatestBlogs;