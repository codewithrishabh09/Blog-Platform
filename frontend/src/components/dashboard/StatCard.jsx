import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function StatCard({ title, value, delay = 0 }) {
  const numericValue = typeof value === "number" ? value : parseFloat(value);
  const isNumeric = !isNaN(numericValue) && typeof value !== "string"?.includes?.("K");
  const [display, setDisplay] = useState(isNumeric ? 0 : value);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value);
      return;
    }
    let frame;
    const duration = 800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * numericValue));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, isNumeric, numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="bg-white border border-[#E8E6E0] rounded-xl p-6 transition-shadow hover:shadow-md"
    >
      <p
        className="text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {title}
      </p>
      <p
        className="text-3xl text-[#1A1A1A]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {display}
      </p>
    </motion.div>
  );
}

export default StatCard;