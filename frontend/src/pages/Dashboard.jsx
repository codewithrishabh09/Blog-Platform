import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import API from "../api/axios";

import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import ViewsChart from "../components/dashboard/ViewsChart";
import LikesChart from "../components/dashboard/LikesChart";
import TopAuthors from "../components/dashboard/TopAuthors";
import TrendingPosts from "../components/dashboard/TrendingPosts";
import CategoryStats from "../components/dashboard/CategoryStats";
import RecentPosts from "../components/dashboard/RecentPosts";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function Dashboard() {
  const [postCount, setPostCount] = useState(0);

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

      <div className="max-w-6xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Overview
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Dashboard
        </motion.h1>

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <StatCard title="Posts" value={postCount} delay={0} />
          <StatCard title="Likes" value={520} delay={0.05} />
          <StatCard title="Comments" value={120} delay={0.1} />
          <StatCard title="Views" value="5.2K" delay={0.15} />
        </div>

        <div className="mb-8">
          <AnalyticsChart />
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <ViewsChart />
          <LikesChart />
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <TopAuthors />
          <TrendingPosts />
          <CategoryStats />
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