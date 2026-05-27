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
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-700"
  },
  {
    title: "Get an NVQ",
    description: "Get qualified with NVQ by trade",
    icon: FileText,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-700"
  },
  {
    title: "Apply for CSCS",
    description: "Apply for your CSCS or CPCS card",
    icon: CreditCard,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-700",
    iconBg: "bg-indigo-700"
  },
  {
    title: "Upgrade Your Level",
    description: "Move to the next level and boost your career",
    icon: TrendingUp,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-700"
  }
];

function ServiceCards() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group rounded-2xl p-6 flex flex-col justify-between shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer ${service.bgColor}`}
          >
            <div className="flex gap-4 items-start">
              <div className={`${service.iconBg} p-3 rounded-xl shadow-sm`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col mt-1">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted font-medium line-clamp-2">{service.description}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServiceCards;
