import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 } }}
      className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden transform hover:shadow-2xl "
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

      <h2 className="mt-2 text-slate-900 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-700 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default Card;
