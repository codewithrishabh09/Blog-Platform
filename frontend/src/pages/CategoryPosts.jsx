import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

const categoryDetails = {
    technology: {
        description: "Explore the latest in tech, from cutting-edge gadgets and software engineering to AI breakthroughs.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    },
    travel: {
        description: "Discover the world's hidden gems, travel tips, and breathtaking destinations to plan your next adventure.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200"
    },
    food: {
        description: "Indulge in delicious recipes, culinary trends, and flavor profiles from kitchens around the globe.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
    },
    health: {
        description: "Empower your well-being with insights on fitness, mental health, and healthy living practices.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
    },
    finance: {
        description: "Stay ahead with expert advice on personal finance, investing, and market trends to build your wealth.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200"
    },
    lifestyle: {
        description: "Find inspiration for your daily life, home decor, personal growth, and creating a balanced routine.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200"
    },
};

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

            <div className="max-w-4xl mx-auto px-6 md:px-0 pt-10 pb-24">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 shadow-lg">
                    {categoryDetails[tag?.toLowerCase()]?.image ? (
                        <img
                            src={categoryDetails[tag.toLowerCase()].image}
                            alt={tag}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-[#4C4A9E]/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <p
                            className="text-xs uppercase tracking-[0.2em] text-[#E8E6E0] mb-3"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            Category
                        </p>
                        <h1
                            className="text-4xl md:text-5xl text-white mb-4 capitalize font-bold drop-shadow-md"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            {tag}
                        </h1>

                        {categoryDetails[tag?.toLowerCase()] && (
                            <p className="text-[#E8E6E0]/90 max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                                {categoryDetails[tag.toLowerCase()].description}
                            </p>
                        )}
                    </div>
                </div>

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