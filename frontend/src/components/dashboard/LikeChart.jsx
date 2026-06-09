import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

const data = [
  {
    name: "Likes",
    value: 600
  },
  {
    name: "Remaining",
    value: 400
  }
];

function LikesChart() {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Likes Ratio
      </h2>

      <PieChart
        width={300}
        height={250}
      >
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
          fill="#2563EB"
        >
          {data.map((entry, index) => (
            <Cell key={index} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

    </div>
  );
}

export default LikesChart;