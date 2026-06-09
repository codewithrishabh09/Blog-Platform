import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="bg-white rounded-xl shadow-lg p-5 hover:-translate-y-2 transition duration-300">

        <img
          src={
            post.image ||
            "https://picsum.photos/400/200"
          }
          alt=""
          className="rounded-lg mb-4"
        />

        <h2 className="font-bold text-xl mb-2">
          {post.title}
        </h2>

        <p className="text-gray-500">
          {post.author}
        </p>

      </div>
    </Link>
  );
}

export default PostCard;