import Navbar from "../components/navbar/Navbar";

import TrafficChart from "../components/analytics/TrafficChart";
import EngagementChart from "../components/analytics/EngagementChart";
import AudienceChart from "../components/analytics/AudienceChart";

function Analytics() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-4xl font-bold mb-8">
          Analytics
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <TrafficChart />

          <EngagementChart />

        </div>

        <AudienceChart />

      </div>
    </>
  );
}

export default Analytics;