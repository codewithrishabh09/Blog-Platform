import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/posts/${postId}`);
        setPost(response.data);

        const commentsResponse = await API.get(`/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleComment = async () => {
    try {
      const response = await API.post(`/posts/${postId}/comments`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/posts/${postId}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-10">
          <p className="text-red-500">Post not found</p>
        </div>
      </>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-4">
            By {post.author.username} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>

          {user && user._id === post.author._id && (
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => navigate(`/edit-post/${post._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded mb-2"
              rows="3"
            ></textarea>
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">
                      {comment.author.username}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
