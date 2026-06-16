import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function PostDetails() {
  const { id } = useParams(); // this is actually the post's slug
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentsRes = await API.get(`/comments/${postRes.data._id}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleComment = async () => {
    if (!newComment.trim() || !post) return;
    try {
      const res = await API.post(`/comments/${post._id}`, {
        body: newComment,
        parent_id: null,
      });
      setComments([...comments, { ...res.data, body: newComment }]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/posts/${post._id}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 pt-24 text-center">
          <p
            className="text-2xl text-[#1A1A1A] mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Page not found
          </p>
          <p className="text-[#1A1A1A]/50">
            This post doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {post.created_at &&
            new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </p>

        <h1
          className="text-4xl md:text-5xl text-[#1A1A1A] mb-4 leading-tight"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {post.title}
        </h1>

        <p className="text-sm text-[#1A1A1A]/50 mb-10 pb-8 border-b border-[#E8E6E0]">
          By {post.author_username || "Unknown"}
        </p>

        <p className="text-[#1A1A1A]/85 whitespace-pre-wrap leading-relaxed text-lg mb-10">
          {post.body}
        </p>

        <div className="flex gap-3 pb-10 mb-10 border-b border-[#E8E6E0]">
          <button
            onClick={() => navigate(`/edit-post/${post._id}`)}
            className="text-sm px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#4C4A9E] hover:text-[#4C4A9E] transition-colors duration-150"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:border-red-400 hover:text-red-500 transition-colors duration-150"
          >
            Delete
          </button>
        </div>

        <h2
          className="text-2xl text-[#1A1A1A] mb-6"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Comments
        </h2>

        <div className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-4 bg-white border border-[#E8E6E0] rounded-lg mb-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
            rows="3"
          ></textarea>
          <button
            onClick={handleComment}
            className="text-sm px-5 py-2 rounded-full bg-[#4C4A9E] text-white hover:bg-[#3D3B80] transition-colors duration-150"
          >
            Post comment
          </button>
        </div>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-[#1A1A1A]/40 text-sm">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="pb-6 border-b border-[#E8E6E0] last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#1A1A1A] text-sm">
                    {comment.author_username}
                  </h4>
                  <span
                    className="text-xs text-[#1A1A1A]/40"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {comment.created_at &&
                      new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#1A1A1A]/75 leading-relaxed">
                  {comment.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}