"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Select from "react-select";
import {
  ShieldCheck,
  Headphones,
  Award,
  BookOpen,
  Search,
} from "lucide-react";
import coursesData from "../data/courses.json";

/* =========================
   React Select Styles
========================= */
const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "9999px",
    padding: "6px 8px",
    borderColor: state.isFocused
      ? "var(--primary)"
      : "var(--border)",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(149, 193, 31, 0.15)"
      : "none",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid var(--border)",
    minHeight: "48px",
    transition: "all 0.25s ease",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "14px",
    overflow: "hidden",
    zIndex: 9999999,
    border: "1px solid var(--border)",
    boxShadow: "0 12px 40px rgba(15, 81, 50, 0.08)",
    backgroundColor: "var(--surface)",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "var(--normal)"
      : "var(--surface)",
    color: "var(--foreground)",
    cursor: "pointer",
    padding: "10px 12px",
    transition: "all 0.2s ease",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--secondary)",
    fontSize: "16px",
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--foreground)",
    fontWeight: 500,
  }),

  input: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "var(--primary)" : "var(--muted)",
    transition: "all 0.2s ease",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function HeroSection() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleSearch = () => {
    if (selectedTrade) {
      let url = `/courses?trade=${selectedTrade}`;
      if (selectedLevel) {
        url += `&level=${selectedLevel}`;
      }
      router.push(url);
    } else {
      router.push("/courses");
    }
  };

  const availableLevels =
    coursesData.find((t) => t.slug === selectedTrade)?.levels || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const features = [
    { icon: ShieldCheck, text: "UK Accredited" },
    { icon: Headphones, text: "Expert Support" },
    { icon: Award, text: "High Pass Rate" },
    { icon: BookOpen, text: "Flexible Learning" },
  ];

  const tradeOptions = coursesData.map((trade) => ({
    value: trade.slug,
    label: trade.trade,
  }));

  const levelOptions = availableLevels.map((lvl) => ({
    value: lvl.level,
    label: `Level ${lvl.level}`,
  }));
  const headingText1 = "Learn. Qualify.";
  const headingText2 = "Build Your Future.";
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [startSecondLine, setStartSecondLine] = useState(false);

  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);

  useEffect(() => {
    let i = 0;

    const typeFirst = setInterval(() => {
      setText1(headingText1.slice(0, i + 1));
      i++;

      if (i === headingText1.length) {
        clearInterval(typeFirst);
        setDone1(true);

        setTimeout(() => {
          setStartSecondLine(true);

          let j = 0;
          const typeSecond = setInterval(() => {
            setText2(headingText2.slice(0, j + 1));
            j++;

            if (j === headingText2.length) {
              clearInterval(typeSecond);
              setDone2(true);
            }
          }, 80);  // second
        }, 250);
      }
    }, 90);  // first

    return () => clearInterval(typeFirst);
  }, []);

  return (
    <section className="relative  min-h-[80vh]  flex items-center justify-center overflow-visible bg-background px-4 sm:px-6 lg:px-8 py-16">

      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-top opacity-60"
        >
          <source src="/videoo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* HERO CONTENT */}
      <motion.div
        className="relative max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-secondary leading-[1.05]"
        >
          {/* LINE 1 */}
          <div className="relative min-h-[1.2em] overflow-hidden">
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {text1}
            </motion.span>

            {/* Cursor */}
            {!done1 && (
              <span className="ml-1 text-primary animate-[blink_1s_steps(2)_infinite]">
                |
              </span>
            )}
          </div>

          {/* LINE 2 */}
          <div className="mt-4 relative min-h-[1.2em] overflow-hidden">
            {startSecondLine && (
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              >
                <span className="text-primary">{text2.slice(0, 5)}</span>
                <span>{text2.slice(5)}</span>
              </motion.span>
            )}

            {/* Cursor */}
            {startSecondLine && !done2 && (
              <span className="ml-1 text-primary animate-[blink_1s_steps(2)_infinite]">
                |
              </span>
            )}
          </div>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-muted font-medium leading-relaxed"
        >
          CITB courses, NVQs and CSCS cards — everything you need to work on
          site, get qualified, and grow your construction career faster.
        </motion.p>

        {/* SEARCH PILL - IMPROVED DESIGN */}
        <motion.div
          variants={itemVariants}
          className="relative mt-10 max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 z-30 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]"
        >
          {/* Animated gradient border (pseudo-element) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

          {/* TRADE SELECT */}
          <div className="w-full sm:w-[42%] px-2 sm:px-3">
            <Select
              options={tradeOptions}
              value={tradeOptions.find((t) => t.value === selectedTrade)}
              onChange={(option) => {
                setSelectedTrade(option?.value || "");
                setSelectedLevel("");
              }}
              placeholder="Select Trade"
              isSearchable
              styles={customStyles}
              menuPortalTarget={typeof window !== "undefined" ? document.body : null}
              menuPosition="fixed"
              className="text-black font-bold text-lg"
            />
          </div>

          {/* DIVIDER (desktop only) */}
          <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

          {/* LEVEL SELECT */}
          <div className="w-full sm:w-[38%] px-2 sm:px-3">
            <Select
              options={levelOptions}
              value={levelOptions.find((l) => l.value === selectedLevel)}
              onChange={(option) => setSelectedLevel(option?.value || "")}
              placeholder="Select Level"
              isDisabled={!selectedTrade}
              styles={customStyles}
              isSearchable
              menuPortalTarget={typeof window !== "undefined" ? document.body : null}
              menuPosition="fixed"
              className="text-black font-bold text-lg"
            />
          </div>

          {/* SEARCH BUTTON */}
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap group relative overflow-hidden"
          >
            <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span>Find Courses</span>
            {/* Ripple effect on click (optional) */}
            <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 origin-center" />
          </motion.button>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5 relative  "
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm"
            >
              <div className="bg-normal p-1.5 rounded-full">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-secondary">
                {feature.text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;