import { Link } from "react-router-dom";

export default function CategoriesSection() {
  const categories = [
    { name: "Technology", icon: "💻" },
    { name: "Travel", icon: "✈️" },
    { name: "Food", icon: "🍔" },
    { name: "Health", icon: "❤️" },
    { name: "Finance", icon: "💰" },
    { name: "Lifestyle", icon: "🏠" },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
