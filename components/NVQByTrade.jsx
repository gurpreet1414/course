"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Hammer, Cuboid, PaintRoller, Shovel, Home, Grid3X3, Zap, 
  LayoutGrid, ShieldCheck, Clock3, MousePointerClick, RefreshCw,
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
    <section className="relative overflow-hidden bg-nvq-bg py-24 text-foreground transition-colors duration-500">
      
      {/* Background glow */}
      <div className="absolute left-1/2 top-[48%] h-72 w-72 -translate-x-1/2 rounded-full bg-glow-primary blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--nvq-radial),transparent_45%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-text"
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
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Choose your NVQ trade
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            One platform, multiple construction qualifications. Start with your
            trade and connect directly to the right NVQ route.
          </motion.p>
        </div>

        {/* Visual Container (Height un-constrained on mobile to prevent squishing) */}
        <div className="relative mx-auto h-auto pb-10 sm:h-[470px] sm:pb-0 max-w-5xl">
          
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
                      "0 0 0 transparent",
                      "0 0 0 transparent",
                      "var(--nvq-glow-shadow)",
                      "0 0 0 transparent",
                    ],
                    borderColor: [
                      "var(--nvq-border-base)",
                      "var(--nvq-border-base)",
                      "var(--nvq-border-active)",
                      "var(--nvq-border-base)",
                    ],
                  }}
                  transition={{ duration: 6, delay: index * 0.32, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-xl border bg-transparent"
                >
                  <Link
                    href="#"
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-transparent bg-surface transition-all hover:border-primary/70 hover:bg-primary/10 shadow-sm"
                  >
                    <trade.icon className="h-6 w-6 text-muted transition-colors group-hover:text-primary-text" />
                  </Link>
                </motion.div>

                <span className="hidden text-center text-xs font-semibold text-foreground transition-colors group-hover:text-primary-text sm:block">
                  {trade.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* SVG dots + autoplay connecting lines (Hidden on Mobile) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-[118px] z-10 hidden h-[270px] w-full sm:block"
            viewBox="0 0 1000 270"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Top dots */}
            {dotPositions.map((x, index) => (
              <motion.circle
                key={`dot-${index}`}
                cx={x}
                cy="12"
                r="4"
                fill="var(--nvq-svg-color)"
                animate={{ scale: [1, 1, 1.8, 1], opacity: [0.55, 0.55, 1, 0.75] }}
                transition={{ duration: 6, delay: index * 0.32, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "var(--nvq-svg-shadow)", transformOrigin: `${x}px 12px` }}
              />
            ))}

            {linePaths.map((d, index) => (
              <g key={index}>
                {/* Faint always-visible base line */}
                <path d={d} stroke="var(--nvq-svg-faint)" strokeWidth="1.8" strokeLinecap="round" />

                {/* Autoplay drawing line */}
                <motion.path
                  d={d}
                  stroke="var(--nvq-svg-color)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 6, delay: index * 0.32, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Moving energy particle */}
                <motion.circle
                  r="4"
                  fill="var(--nvq-svg-color)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "100%", "100%", "100%"] }}
                  transition={{ duration: 6, delay: index * 0.32, repeat: Infinity, ease: "easeInOut" }}
                  style={{ offsetPath: `path("${d}")`, filter: "var(--nvq-svg-shadow)" }}
                />
              </g>
            ))}
          </svg>

          {/* Center glowing icon (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-[315px] z-30 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-nvq-center sm:flex"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [1, 0.85, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-8 w-8 text-primary-text" />
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
              transition={{ delay: 0.2 + index * 0.15, duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <feature.icon className="h-5 w-5 text-primary-text" />
              <span className="whitespace-nowrap text-sm font-bold text-foreground">
                {feature.title}
              </span>

              {/* Dashed line hidden on mobile for a cleaner stacked list */}
              <motion.span
                animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, delay: index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden h-px flex-1 origin-left border-t border-dashed border-primary/30 sm:block"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}