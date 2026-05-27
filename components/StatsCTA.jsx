"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "15,000+", label: "Qualified Professionals" },
  { value: "98%", label: "Pass Rate" },
  { value: "300+", label: "Courses Available" },
  { value: "24/7", label: "Support" },
];

function StatsCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <span className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight block mb-2">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  {stat.label}
                </span>

                {/* Premium Accent Line */}
                <div className="mt-5 h-1 w-10 bg-primary rounded-full group-hover:w-16 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Right Side CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[32px] overflow-hidden min-h-[500px] shadow-2xl border border-white/20"
          >
            {/* Background Image */}
            <img
              src="/bg.png"
              alt="Career growth"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"></div>

            {/* Floating Glass Card */}
            <div className="relative z-10 h-full flex items-center p-8 sm:p-12 lg:p-14">
              <div className="max-w-md bg-white rounded-3xl p-8 shadow-2xl">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-5">
                  Career Growth
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                  Ready to Upgrade <br />
                  Your Career?
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                  Join thousands of professionals who trust us to build
                  qualifications, grow skills, and unlock better opportunities.
                </p>

                <button className="group bg-primary hover:bg-secondary text-white font-semibold text-sm px-8 py-4 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105">
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Floating Glow */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StatsCTA;