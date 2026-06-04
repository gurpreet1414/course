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
    color: "text-[var(--card-emerald-text)]",
    glow: "bg-[var(--card-emerald-bg)]",
  },
  {
    title: "Get an NVQ",
    description: "Get qualified with NVQ by trade",
    icon: FileText,
    color: "text-[var(--card-blue-text)]",
    glow: "bg-[var(--card-blue-bg)]",
  },
  {
    title: "Apply for CSCS",
    description: "Apply for your CSCS or CPCS card",
    icon: CreditCard,
    color: "text-[var(--card-indigo-text)]",
    glow: "bg-[var(--card-indigo-bg)]",
  },
  {
    title: "Upgrade Your Level",
    description: "Move to the next level and boost your career",
    icon: TrendingUp,
    color: "text-[var(--card-amber-text)]",
    glow: "bg-[var(--card-amber-bg)]",
  }
];

function ServiceCards() {
  return (
    <section className="container relative z-20 mx-auto -mt-6 px-4 sm:-mt-10 sm:px-6 lg:-mt-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            style={{ boxShadow: 'var(--card-shadow)' }}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-surface"
          >
            {/* Glow effect */}
            <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${service.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`} />

            <div className="relative flex items-start gap-4">
              <div className={`rounded-xl border border-border bg-background p-3 shadow-sm ${service.color}`}>
                <service.icon className="h-6 w-6" />
              </div>
              <div className="mt-1 flex flex-col">
                <h3 className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary-text">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-sm font-medium text-muted">
                  {service.description}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary-text" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServiceCards;