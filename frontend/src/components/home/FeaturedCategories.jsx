function FeaturedCategories() {
  const categories = [
    "Programming",
    "AI",
    "Business",
    "Technology",
    "Travel",
    "Food"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-8">
        Featured Categories
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow text-center"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedCategories;