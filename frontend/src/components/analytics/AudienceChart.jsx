import {
  PieChart,
  Pie,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Mobile",
    value: 65
  },
  {
    name: "Desktop",
    value: 35
  }
];

function AudienceChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Audience Devices
      </h2>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
        />
        <Tooltip />
      </PieChart>

    </div>
  );
}

export default AudienceChart;