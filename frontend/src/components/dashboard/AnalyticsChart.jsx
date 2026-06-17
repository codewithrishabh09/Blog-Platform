import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Analytics overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E0" />
          <XAxis dataKey="name" stroke="#1A1A1A" tick={{ fontSize: 12, fill: "#1A1A1A99" }} />
          <YAxis stroke="#1A1A1A" tick={{ fontSize: 12, fill: "#1A1A1A99" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E8E6E0",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#4C4A9E"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={1200}
          />
          <Line
            type="monotone"
            dataKey="likes"
            stroke="#7A8B6F"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={1200}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}