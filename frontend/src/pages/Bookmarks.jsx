import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await API.get("/bookmarks");
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const removeBookmark = async (postId) => {
    try {
      await API.delete(`/bookmarks/${postId}`);
      setBookmarks(bookmarks.filter((b) => b.post._id !== postId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
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

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Bookmarks</h1>

        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <p className="text-gray-500">No bookmarks yet.</p>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.post._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <a
                  href={`/post/${bookmark.post._id}`}
                  className="flex-1"
                >
                  <h3 className="font-semibold text-lg">
                    {bookmark.post.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {bookmark.post.excerpt}
                  </p>
                </a>

                <button
                  onClick={() => removeBookmark(bookmark.post._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
