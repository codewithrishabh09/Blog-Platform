import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", likes: 120, comments: 40 },
  { name: "Feb", likes: 190, comments: 60 },
  { name: "Mar", likes: 130, comments: 50 },
  { name: "Apr", likes: 200, comments: 70 },
  { name: "May", likes: 150, comments: 55 },
  { name: "Jun", likes: 220, comments: 80 },
];

export default function EngagementChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Engagement Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="likes" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
