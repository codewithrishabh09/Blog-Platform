function FeaturedPost() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <img
          src="https://picsum.photos/1200/500"
          alt=""
          className="w-full h-96 object-cover"
        />

        <div className="p-8">

          <span className="text-blue-600">
            Featured Story
          </span>

          <h2 className="text-4xl font-bold mt-3 mb-4">
            The Future of Artificial Intelligence
          </h2>

          <p className="text-gray-500">
            Explore how AI is transforming
            industries and changing the world.
          </p>

        </div>

      </div>

    </section>
  );
}

export default FeaturedPost;