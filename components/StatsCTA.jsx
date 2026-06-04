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
    <section className="relative overflow-hidden bg-stats-bg py-20 sm:py-24 transition-colors duration-500">
      {/* Soft Background Elements */}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-stats-blob-1 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-stats-blob-2 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-14 max-w-3xl"
        >
          <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Trusted Construction Training, Proven Results
          </h2>
        </motion.div>

        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
          {/* Left Side Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl sm:rounded-3xl border border-stats-border bg-stats-card-bg p-5 sm:p-8 shadow-stats-card backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-stats-card-hover"
              >
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                  className="mb-1 sm:mb-2 block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-text"
                >
                  {stat.value}
                </motion.span>

                <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">
                  {stat.label}
                </span>

                {/* Accent Line */}
                <div className="mt-4 sm:mt-5 h-1 w-10 rounded-full bg-stats-accent-base transition-all duration-300 group-hover:w-16 group-hover:bg-stats-accent-hover" />
              </motion.div>
            ))}
          </div>

          {/* Right Side Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-[24px] sm:rounded-[32px] border border-stats-border shadow-stats-video"
          >
            <video
              src="/construction.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-stats-video-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StatsCTA;