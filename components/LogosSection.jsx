"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/6.png",
  "/7.png",
  "/8.png",
];

function LogosSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 py-20 border-y border-green-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-700">
            Trusted • Accredited • Recognised
          </span>

          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
            Certifications & Industry Partners
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-green-600" />
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group relative flex items-center justify-center rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-500 hover:border-green-300 hover:shadow-xl"
            >
              {/* Logo */}
              <div className="relative h-14 w-full">
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  className="object-contain transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative blur */}
        <div className="absolute left-10 top-10 h-28 w-28 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>
    </section>
  );
}

export default LogosSection;