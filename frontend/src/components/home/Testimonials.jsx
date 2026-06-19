import { motion } from "framer-motion";

function Testimonials() {
  const testimonials = [
    {
      quote: "Amazing content and beautiful design.",
      name: "John Doe",
    },
    {
      quote: "One of the best blogging platforms.",
      name: "Sarah Smith",
    },
    {
      quote: "Very clean and professional experience.",
      name: "David Miller",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-0 py-16 border-t border-[#E8E6E0]">
      <p
        className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        What readers say
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white border border-[#E8E6E0] rounded-xl p-6"
          >
            <p className="text-[#1A1A1A]/80 leading-relaxed mb-4">
              "{t.quote}"
            </p>
            <p
              className="text-sm text-[#1A1A1A]/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — {t.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;