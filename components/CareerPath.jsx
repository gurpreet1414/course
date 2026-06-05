"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const paths = [
  {
    level: "Level 2",
    title: "Worker",
    cardName: "Blue Card",
    image: "/metalicc.png",
    description: "Start your construction career with the essential skills, safety knowledge, and site-readiness needed to work confidently as a qualified worker.",
    points: ["Entry-level pathway", "Site safety basics", "Practical job skills"],
  },
  {
    level: "Level 3",
    title: "Supervisor",
    cardName: "Gold Card",
    image: "/goldenm.png",
    description: "Step into a leadership role by learning how to manage teams, coordinate daily site tasks, and maintain high safety and quality standards.",
    points: ["Team supervision", "Worksite coordination", "Leadership growth"],
  },
  {
    level: "Level 4/5",
    title: "Senior / Advanced",
    cardName: "Green Card",
    image: "/greenm.png",
    description: "Build advanced expertise for senior responsibilities, complex site operations, and higher-level decision-making across construction projects.",
    points: ["Advanced skills", "Senior responsibilities", "Project confidence"],
  },
  {
    level: "Level 6",
    title: "Manager",
    cardName: "Black Card",
    image: "/blackm.png",
    description: "Progress into management with the knowledge to lead projects, guide teams, manage compliance, and take ownership of construction delivery.",
    points: ["Project management", "Compliance leadership", "Career progression"],
  },
];

// ==========================================
// SHARED COMPONENTS
// ==========================================

function AnimatedWords({ text, scrollYProgress, start, middle, end }) {
  const words = text.split(" ");

  return (
    <h3 className="mb-2 sm:mb-5 flex max-w-2xl flex-wrap gap-x-2 sm:gap-x-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
      {words.map((word, wordIndex) => {
        const wordStart = start + wordIndex * 0.008;
        const wordEnd = end - 0.06;

        const y = useTransform(scrollYProgress, [wordStart, middle, wordEnd], [20, 0, -20]);
        const rotateX = useTransform(scrollYProgress, [wordStart, middle, wordEnd], [10, 0, -8]);

        return (
          <motion.span
            key={`${word}-${wordIndex}`}
            style={{ opacity: 1, y, rotateX, filter: "blur(0px)", transformPerspective: 900, transformStyle: "preserve-3d" }}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </h3>
  );
}

function FloatingBackground({ scrollYProgress }) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yOne = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yTwo = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ rotate, y: yOne, scale }} className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-glow-primary blur-3xl" />
      <motion.div style={{ rotate, y: yTwo }} className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-glow-secondary blur-3xl" />
      <motion.div style={{ y: yOne }} className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-glow-primary blur-2xl" />
    </div>
  );
}

function CareerSlide({ path, index, scrollYProgress }) {
  const total = paths.length;
  const start = index / total;
  const enter = start + 0.1 / total;
  const holdStart = start + 0.22 / total;
  const holdEnd = start + 0.58 / total;
  const end = (index + 1) / total;
  const middle = (holdStart + holdEnd) / 2;
  const isFirst = index === 0;

  const opacity = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [80, 0, 0, 0, -120] : [150, 0, 0, 0, -150]);
  const scale = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0.96, 1, 1, 1, 1.04] : [0.72, 1, 1, 1, 1.08]);
  const rotateX = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, -10] : [25, 0, 0, 0, -22]);
  const rotateY = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, 10] : [-22, 0, 0, 0, 22]);
  const z = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, 120] : [-420, 0, 0, 0, 260]);
  
  const contentX = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? ["-10%", "0%", "0%", "0%", "15%"] : ["-30%", "0%", "0%", "0%", "20%"]);
  const imageX = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? ["10%", "0%", "0%", "0%", "-20%"] : ["30%", "0%", "0%", "0%", "-25%"]);
  
  const imageRotateX = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, -10] : [24, 0, 0, 0, -18]);
  const imageRotateY = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, 12] : [-28, 0, 0, 0, 22]);
  const imageRotateZ = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0, 0, 0, 0, 4] : [-8, 0, 0, 0, 7]);
  const imageScale = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], isFirst ? [0.96, 1, 1, 1, 1.04] : [0.75, 1, 1, 1, 1.08]);

  const descriptionOpacity = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], [0, 1, 1, 1, 0]);
  const descriptionY = useTransform(scrollYProgress, [start, enter, holdStart, holdEnd, end], [35, 0, 0, 0, -35]);

  return (
    <motion.div
      style={{ opacity, y, scale, rotateX, rotateY, z, transformPerspective: 1400, transformStyle: "preserve-3d" }}
      className="absolute inset-0 flex items-center will-change-transform"
    >
      <div className="grid w-full grid-cols-1 items-center gap-6 sm:gap-10 lg:gap-12 lg:grid-cols-2">
        <motion.div style={{ x: contentX }} className="order-2 lg:order-1">
          <motion.div
            style={{ opacity: descriptionOpacity, y: descriptionY }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-surface px-4 py-1.5 sm:px-5 sm:py-2 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-text" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-text">{path.level}</span>
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-text" />
          </motion.div>

          <AnimatedWords text={path.title} scrollYProgress={scrollYProgress} start={start} middle={middle} end={end} />

          <motion.p
            style={{ opacity: descriptionOpacity, y: descriptionY }}
            className="max-w-xl text-sm sm:text-xl font-medium leading-relaxed sm:leading-8 text-foreground opacity-90"
          >
            {path.description}
          </motion.p>

          <motion.div
            style={{ opacity: descriptionOpacity, y: descriptionY }}
            className="mt-4 sm:mt-8 grid max-w-xl gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3"
          >
            {path.points.map((point, pointIndex) => (
              <motion.div
                key={point}
                style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 40, rotateX: 35 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: pointIndex * 0.12, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.4 }}
                className="rounded-xl sm:rounded-2xl border border-glass-border bg-glass-surface/80 p-3 sm:p-4 backdrop-blur-md"
              >
                <CheckCircle2 className="mb-1.5 sm:mb-3 h-4 w-4 sm:h-5 sm:w-5 text-primary-text" />
                <p className="text-xs sm:text-sm font-bold text-foreground">{point}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{ opacity: descriptionOpacity, y: descriptionY }}
            className="mt-6 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-semibold text-primary-fg shadow-[0_0_20px_var(--shadow-primary)] transition-all duration-300 hover:scale-105 hover:bg-primary-hover">
              View Courses
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <span className="text-xs sm:text-sm font-semibold text-foreground">{path.cardName}</span>
          </motion.div>
        </motion.div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <motion.div
            style={{ x: imageX, scale: imageScale, rotateX: imageRotateX, rotateY: imageRotateY, rotateZ: imageRotateZ, transformPerspective: 1200, transformStyle: "preserve-3d" }}
            className="relative aspect-[1.8] sm:aspect-[1.58] w-full rounded-[1.5rem] sm:rounded-[2.5rem]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]"
            >
              <Image src={path.image} alt={path.cardName} fill className="object-cover" priority={index === 0} />
            </motion.div>

            <motion.div
              animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.06, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 rounded-full bg-primary px-4 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-fg shadow-[0_0_20px_var(--shadow-primary)]"
            >
              {path.title}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CareerProgress({ scrollYProgress }) {
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute right-4 sm:right-6 top-1/2 hidden h-64 -translate-y-1/2 lg:block">
      <div className="relative h-full w-[3px] overflow-hidden rounded-full bg-border">
        <motion.div
          style={{ height: progressHeight }}
          className="absolute left-0 top-0 w-full rounded-full bg-primary shadow-[0_0_10px_var(--shadow-primary)]"
        />
      </div>

      <div className="absolute -left-[6px] top-0 flex h-full flex-col justify-between">
        {paths.map((item) => (
          <div
            key={item.cardName}
            className="h-4 w-4 rounded-full border-2 border-section-bg bg-primary shadow-[0_0_10px_var(--shadow-primary)]"
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// DESKTOP LAYOUT (Sticky + 3D Scroll)
// ==========================================
function DesktopCareerPath() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.35 });

  return (
    <section ref={sectionRef} className="relative mt-12 sm:mt-20 h-[720vh] bg-section-bg transition-colors duration-500">
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden py-8 sm:py-16">
        <FloatingBackground scrollYProgress={smoothScrollProgress} />

        <div className="container relative mx-auto h-[88vh] min-h-[580px] max-h-[800px] px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ y: useTransform(smoothScrollProgress, [0, 0.12], [0, -120]), opacity: useTransform(smoothScrollProgress, [0, 0.12], [1, 0]) }}
            className="absolute left-4 sm:left-6 lg:left-8 top-0 z-20"
          >
            <div className="mb-1 sm:mb-3 flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-text">Your Career Path</span>
              <CheckCircle2 className="h-3 sm:h-4 w-3 sm:w-4 text-primary-text" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-foreground">
              One Path. Many Opportunities.
            </h2>
          </motion.div>

          <div className="relative h-full pt-16 sm:pt-24 lg:pt-28" style={{ perspective: "1400px", transformStyle: "preserve-3d" }}>
            {paths.map((path, index) => (
              <CareerSlide key={path.cardName} path={path} index={index} scrollYProgress={smoothScrollProgress} />
            ))}
          </div>

          <CareerProgress scrollYProgress={smoothScrollProgress} />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MOBILE LAYOUT (Stacked + Fade In)
// ==========================================
function MobileCareerPath() {
  return (
    <section className="relative mt-12 overflow-hidden bg-section-bg px-4 py-16 sm:mt-20 sm:px-6 sm:py-20">
      {/* Static ambient background for mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-glow-primary blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-glow-secondary blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col gap-18">
        {/* Header */}
        <div className="mb-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-text sm:text-xs">Your Career Path</span>
            <CheckCircle2 className="h-3 w-3 text-primary-text sm:h-4 sm:w-4" />
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            One Path. Many Opportunities.
          </h2>
        </div>

        {/* Cards Stack */}
        {paths.map((path, index) => (
          <motion.div
            key={path.cardName}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            {/* Image Box */}
            <div className="relative aspect-[1.58] w-full">
              <Image src={path.image} alt={path.cardName} fill className="object-cover" priority={index === 0} />
              <div className="absolute -right-2 -top-2 rounded-full bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary-fg shadow-[0_0_20px_var(--shadow-primary)] sm:-right-4 sm:-top-4 sm:px-5 sm:py-3 sm:text-xs">
                {path.title}
              </div>
            </div>

            {/* Content Box */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-surface px-4 py-1.5 shadow-lg backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2">
                <Sparkles className="h-3.5 w-3.5 text-primary-text sm:h-4 sm:w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-text sm:text-xs">{path.level}</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-text sm:h-4 sm:w-4" />
              </div>

              <h3 className="mb-3 text-3xl font-extrabold text-foreground sm:text-4xl">{path.title}</h3>

              <p className="mb-6 text-sm font-medium leading-relaxed text-foreground opacity-90 sm:mb-8 sm:text-lg sm:leading-8">
                {path.description}
              </p>

              <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {path.points.map((point) => (
                  <div key={point} className="flex items-center gap-2 rounded-xl border border-glass-border bg-glass-surface/80 p-3 backdrop-blur-md sm:rounded-2xl sm:p-4">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-text sm:h-5 sm:w-5" />
                    <p className="text-xs font-bold text-foreground sm:text-sm">{point}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-fg shadow-[0_0_20px_var(--shadow-primary)] transition-all duration-300 hover:scale-105 hover:bg-primary-hover sm:px-8 sm:py-4 sm:text-sm">
                  View Courses
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </button>
                <span className="text-xs font-semibold text-foreground sm:text-sm">{path.cardName}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// MAIN EXPORT CONTROLLER
// ==========================================
export default function CareerPath() {
  return (
    <>
      {/* Shown on small screens, hidden on large screens */}
      <div className="block lg:hidden">
        <MobileCareerPath />
      </div>

      {/* Hidden on small screens, shown on large screens */}
      <div className="hidden lg:block">
        <DesktopCareerPath />
      </div>
    </>
  );
}