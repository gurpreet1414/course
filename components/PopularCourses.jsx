"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Activity,
  ShieldCheck,
  HeartPulse,
  HardHat,
  ShieldAlert,
  Clock3,
  BadgePoundSterling,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    title: "CITB Health & Safety",
    duration: "1 Day",
    price: "£85",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    description: "A practical entry-level course designed for learners who want to begin or progress in construction safely and confidently.",
  },
  {
    title: "NEBOSH",
    duration: "5 Days",
    price: "£450",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    description: "A respected safety qualification for professionals who want stronger workplace health and safety knowledge.",
  },
  {
    title: "IOSH Managing Safely",
    duration: "3 Days",
    price: "£350",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    description: "Perfect for managers and supervisors who need practical safety skills for day-to-day team responsibility.",
  },
  {
    title: "First Aid",
    duration: "1 Day",
    price: "£50",
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    description: "Learn essential first aid skills to respond confidently in workplace and emergency situations.",
  },
  {
    title: "EUSR Course",
    duration: "1 Day",
    price: "£110",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1400&q=80",
    description: "A focused course for learners working around utility, construction, and site-based environments.",
  },
  {
    title: "SSSTS",
    duration: "2 Days",
    price: "£195",
    icon: ShieldAlert,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1400&q=80",
    description: "Ideal for site supervisors who want to manage safety, compliance, and site teams more effectively.",
  },
];

export default function PopularCourses() {
  return (
    <section id="courses" className="relative w-full bg-background text-foreground py-24 md:py-32 lg:py-40">
      
      {/* Section Header */}
      <div className="px-6 md:px-8 lg:px-12 mx-auto w-full mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center gap-4 max-w-5xl mx-auto"
        >
          <div className="mb-2 w-fit inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-black uppercase text-primary-text backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Popular Courses
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-black leading-tight tracking-tight text-foreground">
            Choose your next qualification
          </h2>
          
          <p className="mt-2 text-base md:text-lg leading-relaxed text-center text-muted font-medium">
            Explore trusted construction and safety training with clear
            duration, starting price, and flexible booking support.
          </p>
        </motion.div>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative flex flex-col gap-8 md:gap-12 pb-32 px-6 md:px-8 lg:px-12 mx-auto max-w-[100rem]">
        {courses.map((course, index) => {
          const Icon = course.icon;
          
          return (
            <div 
              key={course.title}
              className="sticky w-full flex flex-col lg:flex-row bg-surface border border-border shadow-stack rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
              style={{ 
                top: `calc(10vh + ${index * 40}px)`, 
                height: 'auto',
                minHeight: '600px',
                maxHeight: '85vh' // Prevents mobile from clipping out of bounds
              }}
            >
              
              {/* Left Side: Text Content */}
              <div className="w-full lg:w-[55%] flex flex-col justify-between p-6 md:p-10 lg:p-16 relative z-10 bg-surface overflow-y-auto custom-scrollbar">
                
                <div className="flex flex-col gap-6 w-full">
                  {/* Giant Watermark Number */}
                  <span className="text-6xl md:text-7xl lg:text-9xl text-border font-black leading-none select-none tracking-tighter">
                    0{index + 1}
                  </span>
                  
                  <div className="-mt-8 md:-mt-12 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_20px_var(--primary-shadow)] backdrop-blur">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-text" />
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-foreground">
                        {course.title}
                      </h3>
                    </div>
                    
                    <p className="text-base md:text-lg font-medium leading-relaxed text-muted max-w-xl">
                      {course.description}
                    </p>

                    {/* Info Pills */}
                    <div className="mt-6 sm:mt-8 grid max-w-lg grid-cols-2 gap-3 sm:gap-4">
                      <div className="rounded-2xl border border-border bg-background p-3 sm:p-4 shadow-sm">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:mb-3 sm:h-9 sm:w-9">
                          <Clock3 className="h-4 w-4 text-primary-text" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-muted sm:text-xs">Duration</p>
                        <p className="mt-1 text-base font-black text-foreground sm:text-lg">{course.duration}</p>
                      </div>

                      <div className="rounded-2xl border border-border bg-background p-3 sm:p-4 shadow-sm">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:mb-3 sm:h-9 sm:w-9">
                          <BadgePoundSterling className="h-4 w-4 text-primary-text" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-muted sm:text-xs">Starting from</p>
                        <p className="mt-1 text-base font-black text-foreground sm:text-lg">{course.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Link & Flexible Booking Badge */}
                <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <Link href="/courses" className="bg-transparent group/btn flex items-center gap-3 text-xs font-black uppercase tracking-widest text-foreground">
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-500 group-hover/btn:-translate-y-full">
                        View Course
                      </span>
                      <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 group-hover/btn:translate-y-0 text-primary-text">
                        View Course
                      </span>
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-text transition-all duration-500 group-hover/btn:bg-primary group-hover/btn:text-background group-hover/btn:translate-x-2">
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </div>
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold text-muted sm:text-xs shadow-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-text" />
                    Flexible booking
                  </div>
                </div>
              </div>

              {/* Right Side: Image Cover */}
              <div className="relative w-full lg:w-[45%] h-[30vh] min-h-[250px] lg:h-auto lg:min-h-full overflow-hidden bg-muted/20">
                {/* Subtle inset shadow to blend the image border */}
                <div className="absolute inset-0 z-10 shadow-[inset_10px_0_30px_rgba(0,0,0,0.08)] dark:shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] hidden lg:block pointer-events-none" />
                
                {/* Image Gradient Overlays to preserve legibility and blending */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-105"
                />
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}