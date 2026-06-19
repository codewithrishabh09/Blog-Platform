import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/search/SearchBar";
import CallToAction from "../components/home/CallToAction";
import CategoriesSection from "../components/home/CategoriesSection";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get("/posts");
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-12">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          The Index
        </p>
        <h1
          className="text-4xl md:text-5xl text-[#1A1A1A] mb-2"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Latest writing
        </h1>
        <p className="text-[#1A1A1A]/55 mb-8">
          Fresh entries from people putting thoughts into words.
        </p>

        {!loading && posts.length > 0 && (
          <div className="mb-10">
            <SearchBar posts={posts} setFiltered={setFilteredPosts} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="border-t border-[#E8E6E0] py-16 text-center">
            <p className="text-[#1A1A1A]/50">
              Nothing's been written yet. Be the first.
            </p>
            <Link
              to="/create-post"
              className="inline-block mt-4 text-sm text-[#4C4A9E] hover:underline"
            >
              Write the first post →
            </Link>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="border-t border-[#E8E6E0] py-16 text-center">
            <p className="text-[#1A1A1A]/50">No posts match your search.</p>
          </div>
        ) : (
          <div className="border-t border-[#E8E6E0]">
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post.slug}`}
                className="group flex items-start gap-5 py-6 border-b border-[#E8E6E0] hover:bg-[#F4F2EC] transition-colors duration-150 px-2 -mx-2 rounded-md"
              >
                <span
                  className="hidden sm:flex flex-col items-center justify-center text-center text-[10px] uppercase text-[#7A8B6F]/80 w-12 shrink-0 pt-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "short",
                    })
                    : "—"}
                  <span className="text-base text-[#1A1A1A] not-italic font-medium">
                    {post.published_at
                      ? new Date(post.published_at).getDate()
                      : "·"}
                  </span>
                </span>

                {post.image && (
                  <img
                    src={post.image}
                    alt=""
                    className="w-16 h-16 rounded object-cover shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <h2
                    className="text-xl text-[#1A1A1A] group-hover:text-[#4C4A9E] transition-colors duration-150 mb-1"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#1A1A1A]/50">
                    {post.author_username || "Unknown"}
                    {post.tags && post.tags.length > 0 && (
                      <span> · {post.tags.slice(0, 2).join(", ")}</span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <CategoriesSection />
      <CallToAction />
    </div>
  );
}