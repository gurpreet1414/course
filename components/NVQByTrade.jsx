"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hammer, Cuboid, PaintRoller, Shovel, Home, Grid3X3, Zap, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const trades = [
  { title: "Carpentry", icon: Hammer },
  { title: "Bricklaying", icon: Cuboid },
  { title: "Painting & Decorating", icon: PaintRoller },
  { title: "Plastering", icon: Shovel },
  { title: "Roofing", icon: Home },
  { title: "Flooring", icon: Grid3X3 },
  { title: "Electrical", icon: Zap },
  { title: "More Trades", icon: LayoutGrid },
];

function NVQByTrade() {
  return (
    <section className="py-20 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-extrabold text-foreground"
          >
            NVQ by Trade
          </motion.h2>
          
          <Link href="#" className="group flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors text-sm sm:text-base">
            View All Trades
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {trades.map((trade, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5, borderColor: "var(--primary)" }}
              className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-100 rounded-2xl cursor-pointer group transition-all h-36"
            >
              <trade.icon className="w-10 h-10 text-muted group-hover:text-primary transition-colors mb-4 stroke-[1.5]" />
              <span className="text-xs sm:text-sm font-bold text-center text-foreground group-hover:text-primary transition-colors leading-tight">
                {trade.title}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NVQByTrade;
