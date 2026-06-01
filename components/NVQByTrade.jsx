"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Hammer,
  Cuboid,
  PaintRoller,
  Shovel,
  Home,
  Grid3X3,
  Zap,
  LayoutGrid,
  ShieldCheck,
  Clock3,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

const trades = [
  { title: "Carpentry", icon: Hammer },
  { title: "Bricklaying", icon: Cuboid },
  { title: "Painting", icon: PaintRoller },
  { title: "Plastering", icon: Shovel },
  { title: "Roofing", icon: Home },
  { title: "Flooring", icon: Grid3X3 },
  { title: "Electrical", icon: Zap },
  { title: "More Trades", icon: LayoutGrid },
];

const features = [
  { title: "Instant enrolment", icon: RefreshCw },
  { title: "Verified assessors", icon: ShieldCheck },
  { title: "Fast updates", icon: Clock3 },
  { title: "One-click apply", icon: MousePointerClick },
];

const linePaths = [
  "M500 197 C495 150, 330 85, 65 12",
  "M500 197 C500 148, 390 82, 195 12",
  "M500 197 C500 145, 445 78, 325 12",
  "M500 197 C500 142, 485 72, 455 12",
  "M500 197 C500 142, 515 72, 575 12",
  "M500 197 C500 145, 555 78, 705 12",
  "M500 197 C500 148, 610 82, 835 12",
  "M500 197 C505 150, 670 85, 945 12",
];

const dotPositions = [65, 195, 325, 455, 575, 705, 835, 945];

export default function NVQByTrade() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* Background glow */}
      <div className="absolute left-1/2 top-[48%] h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.08),transparent_45%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-lime-400"
        >
          <Zap className="h-3.5 w-3.5" />
          NVQ Trades
        </motion.div>

        {/* Header */}
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Choose your NVQ trade
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base text-white/70 sm:text-lg"
          >
            One platform, multiple construction qualifications. Start with your
            trade and connect directly to the right NVQ route.
          </motion.p>
        </div>

        {/* Visual */}
        <div className="relative mx-auto h-[470px] max-w-5xl">
          {/* Trade icons row */}
          <div className="relative z-20 grid grid-cols-4 gap-4 sm:grid-cols-8">
            {trades.map((trade, index) => (
              <motion.div
                key={trade.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(163,230,53,0)",
                      "0 0 0 rgba(163,230,53,0)",
                      "0 0 30px rgba(163,230,53,0.8)",
                      "0 0 0 rgba(163,230,53,0)",
                    ],
                    borderColor: [
                      "rgba(255,255,255,0.1)",
                      "rgba(255,255,255,0.1)",
                      "rgba(163,230,53,0.9)",
                      "rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    delay: index * 0.32,
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "easeInOut",
                  }}
                  className="rounded-xl"
                >
                  <Link
                    href="#"
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/30 transition-all hover:border-lime-400/70 hover:bg-lime-400/10"
                  >
                    <trade.icon className="h-6 w-6 text-white transition-colors group-hover:text-lime-400" />
                  </Link>
                </motion.div>

                <span className="hidden text-center text-xs font-semibold text-white/70 group-hover:text-lime-400 sm:block">
                  {trade.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* SVG dots + autoplay connecting lines */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-[118px] z-10 h-[270px] w-full"
            viewBox="0 0 1000 270"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* top dots - dots are now inside SVG so lines connect perfectly */}
            {dotPositions.map((x, index) => (
              <motion.circle
                key={`dot-${index}`}
                cx={x}
                cy="12"
                r="4"
                fill="rgb(163 230 53)"
                animate={{
                  scale: [1, 1, 1.8, 1],
                  opacity: [0.55, 0.55, 1, 0.75],
                }}
                transition={{
                  duration: 6,
                  delay: index * 0.32,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 10px rgb(163 230 53))",
                  transformOrigin: `${x}px 12px`,
                }}
              />
            ))}



            {linePaths.map((d, index) => (
              <g key={index}>
                {/* faint always-visible base line */}
                {/* faint always-visible base line */}
                <path
                  d={d}
                  stroke="rgba(163,230,53,0.13)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* autoplay drawing line */}
                <motion.path
                  d={d}
                  stroke="rgb(163 230 53)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    delay: index * 0.32,
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "easeInOut",
                  }}
                />

                {/* moving energy particle */}
                <motion.circle
                  r="4"
                  fill="rgb(163 230 53)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    offsetDistance: ["0%", "100%", "100%", "100%"],
                  }}
                  transition={{
                    duration: 6,
                    delay: index * 0.32,
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "easeInOut",
                  }}
                  style={{
                    offsetPath: `path("${d}")`,
                    filter: "drop-shadow(0 0 10px rgb(163 230 53))",
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center glowing icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-[315px] z-30 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl border border-lime-400/30 bg-lime-400/10 shadow-[0_0_55px_rgba(132,204,22,0.8)]"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [1, 0.85, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap className="h-8 w-8 text-lime-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom feature line */}
        <div className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.45,
              }}
              className="flex items-center gap-3"
            >
              <feature.icon className="h-5 w-5 text-lime-400" />

              <span className="whitespace-nowrap text-sm font-bold">
                {feature.title}
              </span>

              <motion.span
                animate={{
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-px flex-1 origin-left border-t border-dashed border-lime-400/30"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}