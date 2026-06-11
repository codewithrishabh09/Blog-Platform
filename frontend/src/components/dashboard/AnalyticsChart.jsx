import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", views: 4000, likes: 2400 },
  { name: "Feb", views: 3000, likes: 1398 },
  { name: "Mar", views: 2000, likes: 9800 },
  { name: "Apr", views: 2780, likes: 3908 },
  { name: "May", views: 1890, likes: 4800 },
  { name: "Jun", views: 2390, likes: 3800 },
  { name: "Jul", views: 3490, likes: 4300 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="likes" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
