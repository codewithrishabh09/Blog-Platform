import { Link } from "react-router-dom";

export default function RelatedPosts({ category }) {
  const related = [
    { id: 2, title: "Next.js vs React", category: "Technology", author: "Jane" },
    { id: 3, title: "React Hooks Explained", category: "Technology", author: "Mike" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Related Posts</h2>
      <div className="space-y-3">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="block hover:text-blue-600"
          >
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-500">By {post.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
