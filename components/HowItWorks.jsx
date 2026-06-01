"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Layers,
  ShieldCheck,
  UploadCloud,
  Wrench,
  Zap,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Choose Your Trade",
    desc: "Select your trade and qualification pathway.",
    longDesc:
      "Start by choosing the trade that matches your current work experience, site role, and career goal.",
    icon: Wrench,
    points: ["Pick your trade", "Match your role", "Start your pathway"],
  },
  {
    num: "02",
    title: "Select Your Level",
    desc: "Pick the qualification level for your current role.",
    longDesc:
      "Choose the level that fits your experience, from worker routes to supervisor or advanced options.",
    icon: Layers,
    points: ["Choose correct level", "Role-based guidance", "Clear progression"],
  },
  {
    num: "03",
    title: "Upload Evidence",
    desc: "Submit your documents and work evidence.",
    longDesc:
      "Upload your site evidence, documents, photos, and work records so your assessor can review your portfolio.",
    icon: UploadCloud,
    points: ["Submit documents", "Upload work proof", "Assessor review"],
  },
  {
    num: "04",
    title: "Get Qualified",
    desc: "Assessment completed and get certified.",
    longDesc:
      "Once your evidence is reviewed and approved, your qualification process is completed.",
    icon: Award,
    points: ["Assessment complete", "Get certified", "Ready for site"],
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function HowItWorks() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-120px 0px -120px 0px",
  });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeStep = useMemo(() => steps[active], [active]);
  const ActiveIcon = activeStep.icon;

  useEffect(() => {
    if (!isInView || paused || shouldReduceMotion) return;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % steps.length);
      }, 3200);

      return () => clearInterval(interval);
    }, 1800);

    return () => clearTimeout(startTimer);
  }, [isInView, paused, shouldReduceMotion]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#020402] py-20 text-white sm:py-24 lg:py-28"
      style={{
        "--mx": "50%",
        "--my": "45%",
      }}
    >
      {/* Clean aurora background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(163,230,53,0.14),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.1),transparent_32%)]" />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 60, -25, 0],
                  y: [0, -35, 35, 0],
                  scale: [1, 1.1, 0.98, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-lime-300/[0.075] blur-[130px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -55, 30, 0],
                  y: [0, 45, -28, 0],
                  scale: [1, 0.96, 1.12, 1],
                }
          }
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-10 h-[560px] w-[560px] rounded-full bg-cyan-300/[0.06] blur-[140px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020402_78%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.05 }}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-lime-300 backdrop-blur-xl"
          >
            <Zap className="h-3.5 w-3.5" />
            Simple Process
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.18 }}
            className="text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl"
          >
            How it{" "}
            <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              works
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.32 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base"
          >
            A smooth visual process from choosing your trade to getting
            qualified. Click any step to preview the journey.
          </motion.p>
        </div>

        {/* Desktop layout */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="hidden lg:block"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-[1.05fr_1fr] gap-7">
            {/* Left visual card */}
            <motion.div
              initial={{ opacity: 0, x: -42, y: 20, filter: "blur(16px)" }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: 0.9,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.035] p-8 shadow-[0_35px_130px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(163,230,53,0.14),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(34,211,238,0.09),transparent_34%)]" />

              <div className="relative flex h-full flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-8 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-300">
                      Live Preview
                    </p>
                    <h3 className="mt-2 text-3xl font-black text-white">
                      Qualification Card
                    </h3>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/45">
                    {active + 1} / {steps.length}
                  </div>
                </motion.div>

                <div className="relative flex flex-1 items-center justify-center">
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: [0, -9, 0],
                            rotateX: [0, 2.5, 0],
                            rotateY: [0, -2.5, 0],
                          }
                    }
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative h-[420px] w-[540px]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/[0.08] blur-3xl" />

                    {/* Back cards */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -8, x: -45, y: 38 }}
                      animate={
                        isInView
                          ? { opacity: 1, rotate: -8, x: -45, y: 38 }
                          : {}
                      }
                      transition={{
                        duration: 0.75,
                        delay: 0.95,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-10 rounded-[2rem] border border-white/10 bg-white/[0.04]"
                    />

                    <motion.div
                      initial={{ opacity: 0, rotate: 8, x: 45, y: 34 }}
                      animate={
                        isInView
                          ? { opacity: 1, rotate: 8, x: 45, y: 34 }
                          : {}
                      }
                      transition={{
                        duration: 0.75,
                        delay: 1.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-10 rounded-[2rem] border border-white/10 bg-white/[0.035]"
                    />

                    {/* Main card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 45 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1, y: 0 }
                          : {}
                      }
                      transition={{
                        duration: 0.9,
                        delay: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070a07]/90 p-7 shadow-[0_35px_120px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(163,230,53,0.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%,rgba(34,211,238,0.08))]" />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex w-fit items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.08] px-3 py-1 text-xs font-bold text-lime-200">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Verified Pathway
                            </div>

                            <h4 className="mt-5 text-4xl font-black text-white">
                              NVQ Journey
                            </h4>

                            <p className="mt-2 text-sm text-white/45">
                              Complete your qualification step by step
                            </p>
                          </div>

                          <AnimatePresence mode="wait">
                            <motion.div
                              key={active}
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                                rotate: -10,
                              }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                              transition={{ duration: 0.35 }}
                              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/[0.08] text-lime-300"
                            >
                              <ActiveIcon className="h-8 w-8" />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="mt-9 grid grid-cols-2 gap-3">
                          {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isDone = index <= active;
                            const isCurrent = index === active;

                            return (
                              <motion.button
                                key={step.num}
                                type="button"
                                onClick={() => setActive(index)}
                                initial={{
                                  opacity: 0,
                                  y: 24,
                                  scale: 0.94,
                                  filter: "blur(10px)",
                                }}
                                animate={
                                  isInView
                                    ? {
                                        opacity: isDone ? 1 : 0.42,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                      }
                                    : {}
                                }
                                transition={{
                                  duration: 0.55,
                                  delay: 1.38 + index * 0.14,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`relative rounded-2xl border p-4 text-left transition ${
                                  isCurrent
                                    ? "border-lime-300/35 bg-lime-300/[0.09]"
                                    : isDone
                                    ? "border-emerald-300/20 bg-emerald-300/[0.055]"
                                    : "border-white/10 bg-white/[0.03]"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                      isCurrent
                                        ? "bg-lime-300 text-black"
                                        : isDone
                                        ? "bg-emerald-300/15 text-emerald-200"
                                        : "bg-white/[0.06] text-white/35"
                                    }`}
                                  >
                                    {index < active ? (
                                      <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                      <Icon className="h-5 w-5" />
                                    )}
                                  </span>

                                  <span className="text-xs font-black text-lime-300">
                                    {step.num}
                                  </span>
                                </div>

                                <p className="text-sm font-black leading-tight text-white">
                                  {step.title}
                                </p>

                                {isCurrent && (
                                  <motion.span
                                    layoutId="builderActiveDot"
                                    className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(163,230,53,0.9)]"
                                  />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.55,
                            delay: 2.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mt-auto"
                        >
                          <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.18em] text-white/35">
                            <span>Completion</span>
                            <span>
                              {Math.round(((active + 1) / steps.length) * 100)}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300"
                              animate={{
                                width: `${((active + 1) / steps.length) * 100}%`,
                              }}
                              transition={{ duration: 0.55, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right interactive cards */}
            <div className="grid gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = active === index;
                const isDone = index < active;

                return (
                  <motion.button
                    key={step.num}
                    type="button"
                    onClick={() => setActive(index)}
                    initial={{ opacity: 0, x: 42, filter: "blur(14px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{
                      duration: 0.72,
                      delay: 0.8 + index * 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: -8,
                            transition: { duration: 0.22 },
                          }
                    }
                    className={`group relative overflow-hidden rounded-[2rem] border p-5 text-left shadow-[0_22px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl transition duration-500 ${
                      isActive
                        ? "border-lime-300/35 bg-lime-300/[0.08]"
                        : "border-white/10 bg-white/[0.035] hover:border-lime-300/25 hover:bg-white/[0.055]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-70" />

                    <div className="relative flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition ${
                          isActive
                            ? "bg-lime-300 text-black"
                            : isDone
                            ? "bg-emerald-300/15 text-emerald-200"
                            : "bg-white/[0.06] text-white/50 group-hover:text-lime-300"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <p
                            className={`text-xs font-black uppercase tracking-[0.22em] ${
                              isActive ? "text-lime-300" : "text-white/35"
                            }`}
                          >
                            Step {step.num}
                          </p>

                          <ArrowRight
                            className={`h-4 w-4 transition ${
                              isActive
                                ? "text-lime-300"
                                : "text-white/30 group-hover:text-lime-300"
                            }`}
                          />
                        </div>

                        <h3 className="text-xl font-black text-white">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/50">
                          {step.desc}
                        </p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -8 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -8 }}
                              transition={{ duration: 0.35 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                                {step.points.map((point) => (
                                  <div
                                    key={point}
                                    className="flex items-center gap-2 text-sm font-semibold text-white/70"
                                  >
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                    </span>
                                    {point}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {isActive && !shouldReduceMotion && (
                      <motion.div
                        layoutId="activeStepBorder"
                        className="pointer-events-none absolute inset-0 rounded-[2rem] border border-lime-300/35"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 28,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="mx-auto mt-12 max-w-xl space-y-4 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = active === index;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                animate={
                  isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{
                  duration: 0.68,
                  delay: 0.55 + index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition duration-300 ${
                  isActive
                    ? "border-lime-300/35 bg-lime-300/[0.08]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition ${
                      isActive
                        ? "border-lime-300/35 bg-lime-300 text-black"
                        : "border-white/10 bg-[#070907] text-white/60"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">
                      Step {step.num}
                    </p>
                    <h3 className="mt-1 text-base font-black text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-white/45">
                      {step.desc}
                    </p>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-4 pb-5 pt-4">
                        <p className="text-sm leading-7 text-white/58">
                          {step.longDesc}
                        </p>

                        <div className="mt-4 space-y-2">
                          {step.points.map((point) => (
                            <div
                              key={point}
                              className="flex items-center gap-2 text-sm font-semibold text-white/70"
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </span>
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;