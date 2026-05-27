"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield, Activity, ShieldCheck, HeartPulse, HardHat, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const courses = [
  { title: "CITB Health & Safety", duration: "1 Day", price: "£85", icon: Shield, color: "text-blue-500", bg: "bg-blue-50" },
  { title: "NEBOSH", duration: "5 Days", price: "£450", icon: Activity, color: "text-indigo-500", bg: "bg-indigo-50" },
  { title: "IOSH Managing Safely", duration: "3 Days", price: "£350", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { title: "First Aid", duration: "1 Day", price: "£50", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50" },
  { title: "EUSR Course", duration: "1 Day", price: "£110", icon: HardHat, color: "text-amber-500", bg: "bg-amber-50" },
  { title: "SSSTS", duration: "2 Days", price: "£195", icon: ShieldAlert, color: "text-teal-500", bg: "bg-teal-50" },
];

function PopularCourses() {
  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Popular Courses</span>
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight"
            >
              Boost Your Skills <br className="hidden sm:block" /> With In-Demand Courses
            </motion.h2>
          </div>
          
          <Link href="#" className="group flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors">
            View All Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-soft hover:shadow-card transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 ${course.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <course.icon className={`w-6 h-6 ${course.color}`} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted font-medium">
                  {course.duration} | From {course.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PopularCourses;
