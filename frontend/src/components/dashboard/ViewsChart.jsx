import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Views",
      data: [420, 680, 540, 910, 730, 1100, 860],
      backgroundColor: "#4C4A9E",
      borderRadius: 6,
      maxBarThickness: 28,
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
  animation: { duration: 1000, easing: "easeOutQuart" },
};

export default function ViewsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6"
    >
      <h2
        className="text-lg text-[#1A1A1A] mb-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Views this week
      </h2>
      <Bar data={data} options={options} />
    </motion.div>
  );
}