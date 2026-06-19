import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <section className="max-w-2xl mx-auto px-6 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1A1A] text-white p-10 rounded-2xl text-center"
      >
        <h2
          className="text-3xl mb-3"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Stay in the loop
        </h2>
        <p className="text-white/60 mb-6 text-sm">
          Get the latest posts delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus(null);
            }}
            placeholder="you@example.com"
            className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors duration-150"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 rounded-full bg-white text-[#1A1A1A] font-medium hover:bg-white/90 transition-colors duration-150"
          >
            Subscribe
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[#7A8B6F] mt-4"
            >
              You're on the list! 🎉
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-400 mt-4"
            >
              Please enter a valid email.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Newsletter;