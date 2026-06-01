"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileText, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Book a Course",
    description: "CITB, NEBOSH, IOSH, First Aid & more",
    icon: GraduationCap,
    color: "text-emerald-400",
    glow: "bg-emerald-500/20",
  },
  {
    title: "Get an NVQ",
    description: "Get qualified with NVQ by trade",
    icon: FileText,
    color: "text-blue-400",
    glow: "bg-blue-500/20",
  },
  {
    title: "Apply for CSCS",
    description: "Apply for your CSCS or CPCS card",
    icon: CreditCard,
    color: "text-indigo-400",
    glow: "bg-indigo-500/20",
  },
  {
    title: "Upgrade Your Level",
    description: "Move to the next level and boost your career",
    icon: TrendingUp,
    color: "text-amber-400",
    glow: "bg-amber-500/20",
  }
];

function ServiceCards() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:border-lime-400/30 hover:bg-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer"
          >
            {/* Glow effect */}
            <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${service.glow} blur-3xl opacity-0 transition duration-500 group-hover:opacity-100`} />

            <div className="relative flex gap-4 items-start">
              <div className={`p-3 rounded-xl border border-white/10 bg-white/[0.05] ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col mt-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-white font-medium line-clamp-2">{service.description}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-5 h-5 text-white group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServiceCards;
