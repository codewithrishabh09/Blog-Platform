import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import API from "../api/axios";

import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import RecentPosts from "../components/dashboard/RecentPosts";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function Dashboard() {
  const [postCount, setPostCount] = useState("—");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await API.get("/posts/my");
        setPostCount(res.data.length);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Overview
        </p>
        <h1
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <StatCard title="Posts" value={postCount} />
          <StatCard title="Likes" value="520" />
          <StatCard title="Comments" value="120" />
          <StatCard title="Views" value="5.2K" />
        </div>

        <div className="mb-8">
          <AnalyticsChart />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <RecentPosts />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;