import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function CategoryPosts() {
    const { tag } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await API.get(`/posts`, { params: { tag } });
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching category posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [tag]);

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-24">
                <p
                    className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    Category
                </p>
                <h1
                    className="text-4xl text-[#1A1A1A] mb-10 capitalize"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    {tag}
                </h1>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="border-t border-[#E8E6E0] py-16 text-center">
                        <p className="text-[#1A1A1A]/50">
                            No posts tagged "{tag}" yet.
                        </p>
                    </div>
                ) : (
                    <div className="border-t border-[#E8E6E0]">
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                to={`/post/${post.slug}`}
                                className="group flex items-start gap-5 py-6 border-b border-[#E8E6E0] hover:bg-[#F4F2EC] transition-colors duration-150 px-2 -mx-2 rounded-md"
                            >
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
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}