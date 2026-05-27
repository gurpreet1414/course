"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const paths = [
  {
    level: "Level 2",
    title: "Worker",
    cardName: "Blue Card",
    image: "/blue.png",
  },
  {
    level: "Level 3",
    title: "Supervisor",
    cardName: "Gold Card",
    image: "/gold.png",
  },
  {
    level: "Level 4/5",
    title: "Senior / Advanced",
    cardName: "Green Card",
    image: "/green.png",
  },
  {
    level: "Level 6",
    title: "Manager",
    cardName: "Black Card",
    image: "/black.png",
  },
];

function CareerPath() {
  return (
    <section className="relative mt-20 overflow-hidden bg-[#fbf9f6] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex max-w-2xl flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-2"
          >
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Your Career Path
            </span>
            <CheckCircle2 className="text-primary h-4 w-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground text-4xl font-extrabold leading-tight sm:text-5xl"
          >
            One Path. <br /> Many Opportunities.
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="mb-12 flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:gap-2">
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex w-full flex-col items-center rounded-3xl border border-gray-100 bg-white p-6 shadow-soft transition-all hover:shadow-card lg:w-1/4"
              >
                <span className="text-foreground mb-1 text-sm font-bold">
                  {path.level}
                </span>
                <span className="text-muted mb-6 text-xs font-medium">
                  {path.title}
                </span>

                {/* Actual Card Image */}
                <div className="relative w-full max-w-[220px] aspect-[1.58] overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                  <Image
                    src={path.image}
                    alt={path.cardName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <span className="text-foreground mt-6 text-sm font-bold">
                  {path.cardName}
                </span>
              </motion.div>

              {/* Arrow */}
              {index < paths.length - 1 && (
                <div className="text-muted mx-2 hidden flex-shrink-0 lg:flex">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-soft sm:flex-row">
          <p className="text-muted text-center font-medium sm:text-left">
            Choose your path and we'll guide you every step of the way.
          </p>

          <button className="bg-secondary hover:bg-primary whitespace-nowrap rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300">
            View Full Pathway
          </button>
        </div>
      </div>
    </section>
  );
}

export default CareerPath;