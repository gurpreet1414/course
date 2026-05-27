"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Wrench, Layers, UploadCloud, Award } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Choose Your Trade",
    desc: "Select your trade and qualification",
    icon: Wrench
  },
  {
    num: "02",
    title: "Select Your Level",
    desc: "Pick the right level for your current role",
    icon: Layers
  },
  {
    num: "03",
    title: "Upload Evidence",
    desc: "Submit your documents and work evidence",
    icon: UploadCloud
  },
  {
    num: "04",
    title: "Get Qualified",
    desc: "Assessment completed and get certified",
    icon: Award
  }
];

function HowItWorks() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left Side: Steps */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 block">Simple Process</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white">How It Works</h2>
            </motion.div>

            <div className="relative flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
              {/* Dotted Line (hidden on mobile) */}
              <div className="hidden sm:block absolute top-10 left-12 right-12 h-[2px] border-t-2 border-dashed border-gray-700 z-0"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center max-w-[150px] mx-auto"
                >
                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 relative group cursor-pointer hover:border-primary hover:bg-slate-750 transition-colors">
                    {/* Number Badge */}
                    <div className="absolute -top-2 -left-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      {step.num}
                    </div>
                    <step.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-sm font-bold mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Video Thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/5 relative rounded-3xl overflow-hidden group cursor-pointer aspect-video lg:aspect-square max-h-[400px]"
          >


            {/* Fallback image */}
            <video
              src="/construction.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML += `
      <div class="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-medium text-sm border-2 border-slate-700">
        Video Placeholder
      </div>
    `;
              }}
            >
              Your browser does not support video.
            </video>


          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
