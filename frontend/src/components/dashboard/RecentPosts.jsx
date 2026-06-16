import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await API.get("/posts/my");
        setPosts(res.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="bg-white border border-[#E8E6E0] rounded-xl p-6">
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Recent posts
      </h2>

      {loading ? (
        <p className="text-sm text-[#1A1A1A]/40">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-[#1A1A1A]/40">
          You haven't written anything yet.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post.slug}`}
              className="block py-3 border-b border-[#E8E6E0] last:border-b-0 text-[#1A1A1A]/80 hover:text-[#4C4A9E] transition-colors duration-150 text-sm"
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentPosts;