import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    day: "Mon",
    views: 100
  },
  {
    day: "Tue",
    views: 250
  },
  {
    day: "Wed",
    views: 400
  },
  {
    day: "Thu",
    views: 600
  },
  {
    day: "Fri",
    views: 850
  }
];

function ViewsChart() {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Weekly Views
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ViewsChart;