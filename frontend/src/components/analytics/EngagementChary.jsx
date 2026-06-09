import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", likes: 120 },
  { month: "Feb", likes: 220 },
  { month: "Mar", likes: 400 },
  { month: "Apr", likes: 650 }
];

function EngagementChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Engagement
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="likes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EngagementChart;