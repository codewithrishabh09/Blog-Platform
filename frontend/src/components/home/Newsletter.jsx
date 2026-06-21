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
        className="bg-gradient-to-br from-[#1A1A1A] via-[#2A2A35] to-[#4C4A9E] relative overflow-hidden text-white p-12 rounded-[2rem] text-center shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 rounded-full bg-[#7A8B6F] opacity-30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-64 h-64 rounded-full bg-[#4C4A9E] opacity-40 blur-3xl pointer-events-none"></div>
        <h2
          className="text-3xl md:text-4xl mb-4 relative z-10"
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