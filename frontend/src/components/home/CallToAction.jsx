import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CallToAction() {
  return (
    <section className="py-24 border-t border-[#E8E6E0]">
      <div className="max-w-2xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl text-[#1A1A1A] mb-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Start writing today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#1A1A1A]/55 mb-8"
        >
          Share your ideas with readers who are looking for them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/create-post"
            className="inline-block bg-gradient-to-r from-[#4C4A9E] to-[#605EAA] text-white font-medium px-8 py-3 rounded-full shadow-lg shadow-[#4C4A9E]/20 hover:shadow-xl hover:shadow-[#4C4A9E]/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Write your first post
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;