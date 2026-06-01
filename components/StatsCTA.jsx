"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "15,000+", label: "Qualified Professionals" },
  { value: "98%", label: "Pass Rate" },
  { value: "300+", label: "Courses Available" },
  { value: "24/7", label: "Support" },
];

function StatsCTA() {
  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden">
      {/* Soft Background Elements - No Gradient */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/[0.035] rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-lime-400/[0.04] rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
            Trusted Construction Training, Proven Results
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
                className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-3xl p-8 hover:border-lime-400/30 hover:bg-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500"
              >
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="text-4xl sm:text-5xl font-extrabold text-lime-300 tracking-tight block mb-2"
                >
                  {stat.value}
                </motion.span>

                <span className="text-sm font-semibold text-white/55 tracking-wide">
                  {stat.label}
                </span>

                {/* Accent Line */}
                <div className="mt-5 h-1 w-10 bg-lime-300/45 rounded-full group-hover:w-16 group-hover:bg-lime-300 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Right Side Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative rounded-[32px] overflow-hidden min-h-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.08]"
          >
            <video
              src="/construction.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Simple Dark Overlay - No Gradient */}
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StatsCTA;