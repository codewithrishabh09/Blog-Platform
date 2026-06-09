function CategoryStats() {

  const categories = [
    {
      name: "Programming",
      total: 45
    },
    {
      name: "AI",
      total: 20
    },
    {
      name: "Business",
      total: 12
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Categories
      </h2>

      {categories.map((item, index) => (
        <div
          key={index}
          className="flex justify-between py-2"
        >
          <span>{item.name}</span>

          <span>{item.total}</span>
        </div>
      ))}

    </div>
  );
}

export default CategoryStats;