import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target, inView, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return value;
}

function StatItem({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <p
        className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A1A1A] to-[#4C4A9E] mb-2"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {count}
        {suffix}
      </p>
      <p
        className="text-xs uppercase tracking-wide text-[#1A1A1A]/50"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function StatsSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Blogs" },
    { value: 10, suffix: "K+", label: "Readers" },
    { value: 2, suffix: "K+", label: "Authors" },
    { value: 50, suffix: "K+", label: "Views" },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-0 py-16 border-t border-[#E8E6E0]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

export default StatsSection;