import Navbar from "../components/navbar/Navbar";

import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import RecentPosts from "../components/dashboard/RecentPosts";
import ActivityFeed from "../components/dashboard/ActivityFeed";

import TopAuthors from "../components/dashboard/TopAuthors";
import TrendingPosts from "../components/dashboard/TrendingPosts";
import CategoryStats from "../components/dashboard/CategoryStats";
import ViewsChart from "../components/dashboard/ViewsChart";
import LikesChart from "../components/dashboard/LikesChart";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <StatCard title="Posts" value="25" />
          <StatCard title="Likes" value="520" />
          <StatCard title="Comments" value="120" />
          <StatCard title="Views" value="5.2K" />

        </div>

        {/* Main Analytics */}
        <div className="mb-8">
          <AnalyticsChart />
        </div>

        {/* Views & Likes Charts */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">

          <ViewsChart />

          <LikesChart />

        </div>

        {/* Top Authors, Trending Posts, Categories */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <TopAuthors />

          <TrendingPosts />

          <CategoryStats />

        </div>

        {/* Recent Posts & Activity Feed */}
        <div className="grid md:grid-cols-2 gap-5">

          <RecentPosts />

          <ActivityFeed />

        </div>

      </div>
    </>
  );
}

export default Dashboard;