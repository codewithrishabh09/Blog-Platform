import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await API.get("/analytics");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        {stats && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Posts</h3>
              <p className="text-3xl font-bold">{stats.totalPosts}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Likes</h3>
              <p className="text-3xl font-bold">{stats.totalLikes}</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Comments</h3>
              <p className="text-3xl font-bold">{stats.totalComments}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
