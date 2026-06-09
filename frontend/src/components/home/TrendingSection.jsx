function TrendingSection() {

  const trending = [
    "React Complete Guide",
    "FastAPI Tutorial",
    "MongoDB Aggregation",
    "Machine Learning Basics"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">

      <h2 className="text-3xl font-bold mb-6">
        Trending Blogs
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        {trending.map((blog, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow"
          >
            {blog}
          </div>
        ))}

      </div>

    </section>
  );
}

export default TrendingSection;