function CategoriesSection() {

  const categories = [
    "Programming",
    "AI",
    "Business",
    "Travel",
    "Food",
    "Sports"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">

      <h2 className="text-3xl font-bold mb-6">
        Categories
      </h2>

      <div className="flex flex-wrap gap-4">

        {categories.map((category, index) => (
          <button
            key={index}
            className="bg-blue-100 px-5 py-3 rounded-full"
          >
            {category}
          </button>
        ))}

      </div>

    </section>
  );
}

export default CategoriesSection;