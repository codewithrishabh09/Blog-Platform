import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Likes",
      data: [30, 52, 41, 78, 60, 95, 70],
      borderColor: "#7A8B6F",
      backgroundColor: "rgba(122, 139, 111, 0.12)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2.5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#1A1A1A",
      bodyColor: "#1A1A1A",
      borderColor: "#E8E6E0",
      borderWidth: 1,
      padding: 10,
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#1A1A1A99" } },
    y: { grid: { color: "#E8E6E0" }, ticks: { color: "#1A1A1A99" } },
  },
  animation: { duration: 1200, easing: "easeOutQuart" },
};

export default function LikesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Likes this week
      </h2>
      <Line data={data} options={options} />
    </motion.div>
  );
}